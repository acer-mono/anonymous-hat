import React from 'react';
import 'core-js';
import chat from './chat.svg';
import styles from './styles.module.css';
import Form from '../../components/Form';
import MessagesList from '../../components/MessageList';
import apiService from '../../apiServices';
import { Promise } from 'es6-promise';

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
    };

    this.timer = null;
  }

  componentDidMount() {
    this.setState({ users: [], messages: [] });
    this.timer = setInterval(this.getMessages.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  postMessage({ content }) {
    apiService.message
      .create({ content, chatId: this.props.match.params.id })
      .then(() => this.getMessages());
  }

  getMessages() {
    apiService.message
      .getMessages(this.props.match.params.id)
      .then(response => response.data)
      .then(messages => this.setState({ messages }))
      .then(() => this.getUsers())
      .then(() => {
        const newMessages = this.state.messages.map(message => {
          const user = this.state.users.find(user => user.id === message.userId);
          message.nickname = user.nickname;
          return message;
        });
        this.setState({ messages: newMessages });
      });
  }

  getUsers() {
    const oldUsers = this.state.users;
    const oldUsersIds = oldUsers.map(user => user.id);
    const newUsersIds = [...new Set(this.state.messages.map(message => message.userId))];
    const toLoad = newUsersIds.filter(id => !oldUsersIds.includes(id));

    if (!toLoad.length) return;

    return Promise.all(toLoad.map(id => apiService.user.getById(id)))
      .then(responses => responses.map(response => response.data))
      .then(newUsers => this.setState({ users: [...oldUsers, ...newUsers] }));
  }

  render() {
    const { serverMessages } = this.state;

    return (
      <>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={chat} height="90" alt="" />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.form}>
            <Form postMessage={data => this.postMessage(data)} />
          </div>
          <div className={styles.messages} id="messages">
            <MessagesList messages={serverMessages} />
          </div>
        </div>
      </>
    );
  }
}

export default ChatView;
