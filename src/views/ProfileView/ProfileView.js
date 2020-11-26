import React from 'react';
import ChatForm from '@/components/ChatForm';
import apiServices from '@/apiServices';
import ChatList from '@/components/ChatList';
import SearchChatForm from '@/components/SearchChatForm';
import style from './styles.module.css';
import placeholder from './placeholder.png';

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chats: [],
      foundChats: [],
    };
  }

  componentDidMount() {
    this.getChatList();
  }

  handleChatCreate({ title }) {
    apiServices.chat.create({ title }).then(() => this.getChatList());
  }

  getChatList() {
    apiServices.chat
      .getMyChats(this.props.user.id)
      .then(response => response.data)
      .then(chats => this.setState({ chats }));
  }

  goHandler(id) {
    this.props.history.push(`/chat/${id}`);
  }

  joinHandler(id) {
    if (!confirm('Вы действительно хотите вступить в этот чат?')) return;

    apiServices.chat.join(id).then(() => this.getChatList());
  }

  deleteHandler(id) {
    if (!confirm('Вы действительно хотите удалить этот чат?')) return;

    apiServices.chat
      .delete(id)
      .then(() => this.getChatList())
      .then(() => this.state.foundChats.filter(x => this.state.chats.includes(x)))
      .then(foundChats => this.setState({ foundChats }));
  }

  handleChatSearch({ title }) {
    apiServices.chat
      .search(title)
      .then(response => response.data)
      .then(foundChats => this.setState({ foundChats }));
  }

  render() {
    const { user } = this.props;
    return (
      <>
        {user && (
          <>
            <div className={style.wrapper}>
              <div className={style.profile}>
                <div className="card-body">
                  <div className={style.personalInfo}>
                    <img src={placeholder} className={style.avatar} alt="" />
                    <div>
                      <h3 className="card-title">{user.nickname}</h3>
                      <h5 className="card-text">{new Date(user.createdAt).toLocaleString()}</h5>
                    </div>
                  </div>
                  <div className="mt-2 mb-1">
                    <h5>Создание чата</h5>
                    <ChatForm handleSubmit={data => this.handleChatCreate(data)} />
                  </div>
                  {this.state.chats.length !== 0 && (
                    <>
                      <h5 className="text-center">Мои чаты</h5>
                      <ChatList
                        userId={user.id}
                        list={this.state.chats}
                        goHandler={id => this.goHandler(id)}
                        joinHandler={id => this.joinHandler(id)}
                        deleteHandler={id => this.deleteHandler(id)}
                      />
                    </>
                  )}
                  <div className="mt-2 mb-1">
                    <h5>Поиск чата</h5>
                    <SearchChatForm handleSubmit={data => this.handleChatSearch(data)} />
                  </div>
                  {this.state.foundChats.length !== 0 && (
                    <>
                      <h5 className="text-center">Результаты поиска</h5>
                      <ChatList
                        userId={user.id}
                        list={this.state.foundChats}
                        goHandler={id => this.goHandler(id)}
                        joinHandler={id => this.joinHandler(id)}
                        deleteHandler={id => this.deleteHandler(id)}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
