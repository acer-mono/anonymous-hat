import React from 'react';
import SearchChatForm from '@/components/SearchChatForm';
import ChatList from '@/components/ChatList';
import apiServices from '@/apiServices';
import styles from './styles.module.css';

export default class ChatSearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      foundChats: [],
    };
  }

  getChatList() {
    apiServices.chat.search(this.state.title).then(foundChats => this.setState({ foundChats }));
  }

  handleChatSearch({ title }) {
    this.setState({ title });
    apiServices.chat.search(title).then(foundChats => this.setState({ foundChats }));
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

    apiServices.chat.delete(id).then(() => this.getChatList());
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <div>
              <h4 className="text-center">Поиск чата</h4>
              <SearchChatForm className="mb-2" handleSubmit={data => this.handleChatSearch(data)} />
            </div>
            {this.state.foundChats.length !== 0 && (
              <>
                <h5 className="text-center">Результаты поиска</h5>
                <ChatList
                  className="ml-3 mr-3"
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
      </>
    );
  }
}
