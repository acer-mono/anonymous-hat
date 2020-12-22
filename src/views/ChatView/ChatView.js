import React from 'react';
import 'core-js';
import chat from './chat.svg';
import styles from './styles.module.css';
import Form from '@/components/Form';
import MessagesList from '@/components/MessageList';
import apiService from '@/apiServices';

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
    };

    this.timer = null;
    this.needScroll = true;
  }

  async componentDidMount() {
    this.setState({ users: [], messages: [] });
    this.firstTime = true;
    await this.getMessages();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  postMessage({ content }) {
    apiService.message.create({ content, chatId: this.props.match.params.id }).then(async () => {
      await this.getMessages().then(() => this.scroll());
    });
  }

  async getMessages() {
    function getMessageIds(messages) {
      return messages.map(message => message.id);
    }
    function getOnlyNewMessages(serverMessages, stateMessages) {
      const serverIds = getMessageIds(serverMessages);
      const stateIds = getMessageIds(stateMessages);
      const newIds = serverIds.filter(id => !stateIds.includes(id));
      return serverMessages.filter(message => newIds.includes(message.id));
    }

    const serverMessages = await apiService.message.getMessages(this.props.match.params.id);
    let newMessages = getOnlyNewMessages(serverMessages, this.state.messages);
    await this.addNicknamesToMessages(newMessages);
    if (this.firstTime) {
      this.scroll();
    }
    this.timer = setTimeout(async () => {
      await this.getMessages();
      this.firstTime = false;
    }, 1000);
  }

  async addNicknamesToMessages(newMessages) {
    await this.getUsers(newMessages);
    newMessages = newMessages.map(message => {
      const user = this.state.users.find(user => user.id === message.userId);
      message.nickname = user.nickname;
      return message;
    });
    this.setState({ messages: [...this.state.messages, ...newMessages] });
  }

  async getUsers(newMessages) {
    const oldUsers = this.state.users;
    const oldUsersIds = oldUsers.map(user => user.id);
    const newUsersIds = [...new Set(newMessages.map(message => message.userId))];
    const toLoad = newUsersIds.filter(id => !oldUsersIds.includes(id));
    if (!toLoad.length) return;
    const newUsers = [];
    for (let id of toLoad) {
      const user = await apiService.user.getById(id);
      newUsers.push(user);
    }
    this.setState({ users: [...oldUsers, ...newUsers] });
  }

  scroll() {
    this.messageEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages } = this.state;

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
            <MessagesList messages={messages} />
            <div ref={el => (this.messageEnd = el)}></div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatView;
