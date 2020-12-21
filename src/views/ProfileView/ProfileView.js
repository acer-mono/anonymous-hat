import React from 'react';
import ChatForm from '@/components/ChatForm';
import apiServices from '@/apiServices';
import ChatList from '@/components/ChatList';
import style from './styles.module.css';
import placeholder from './placeholder.png';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiService from '@/apiServices';

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chats: [],
    };
  }

  componentDidMount() {
    this.getChatList();
  }

  handleChatCreate(params) {
    apiServices.chat.create(params).then(() => this.getChatList());
  }

  getChatList() {
    apiService.chat.getMyChats(this.props.user.id).then(chats => this.setState({ chats }));
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

    apiService.chat.delete(id).then(() => this.getChatList());
  }

  logoutHandler() {
    apiService.auth
      .logout()
      .then(() => {
        this.setState({ user: null });
      })
      .then(() => this.props.history.push('/login'));
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
                      <button className="btn btn-primary" onClick={() => this.logoutHandler()}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </button>
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
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
