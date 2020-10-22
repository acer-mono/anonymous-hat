// TODO change host after pull (move to configs)
import React from 'react';
import chat from './chat.svg';
import styles from './styles.module.css';
import Form from '../Form';
import MessagesList from '../MessageList/MessagesList';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
const Promise = require('es6-promise').Promise;
const URL = 'http://localhost:3000/messages';

/**
 * @param {string} method
 * @param {object} data
 * @returns {Promise<object>}
 */
function http(method, data = null) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, URL);
    xhr.send(data ? JSON.stringify(data) : null);

    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = function () {
      reject('Запрос не удался');
    };
  });
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serverMessages: [],
    };

    setInterval(this.getMessagesAsync.bind(this), 1000);
  }

  postMessagePromise() {
    if (!this.user.value || !this.Message.value) {
      console.error('Невозможно отправить сообщение! Пустые обязательные поля!');
      return;
    }

    http('POST', { nick: this.user.value, message: this.Message.value })
      .then(() => {
        this.user.value = '';
        this.Message.value = '';
      })
      .catch(() => {
        this.messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`;
      });
  }

  async postMessageAsync(newMessage) {
    await http('POST', { user: newMessage.user, message: newMessage.message });
  }

  getMessagesPromise() {
    http('GET')
      .then(result => this.drawMessages(result))
      .catch(error => console.log(error));
  }

  async getMessagesAsync() {
    try {
      let result = await http('GET');
      this.drawMessages(result);
    } catch (err) {
      console.error(err);
    }
  }

  drawMessages(response) {
    this.setState({
      serverMessages: response,
    });
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
            <Form postMessage={newMessage => this.postMessageAsync(newMessage)} />
          </div>
          <div className={styles.messages} id="messages">
            <MessagesList messages={serverMessages} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
