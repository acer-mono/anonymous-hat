import React from 'react';
import apiServices from '@/apiServices';
import styles from './styles.module.css';
import UserList from '@/components/UserList';

export default class UserSearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: '',
      foundUsers: [],
    };
  }

  validate() {
    this.setState({
      error: '',
    });
    if (this.state.nickname.length === 0) {
      this.setState({
        error: 'Введите имя пользователя',
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      apiServices.user
        .find(this.state.nickname)
        .then(response => response.data)
        .then(foundUsers => this.setState({ foundUsers, nickname: '' }))
        .catch(error => this.setState({ error: error.response.data.error }));
    }
  }

  handleStartDialogue(userId) {
    apiServices.chat
      .create({
        isDialogue: true,
        participants: [userId],
      })
      .then(response => response.data)
      .then(chat => this.props.history.push(`/chat/${chat.id}`));
    console.log(userId);
  }

  render() {
    const { nickname, error, foundUsers } = this.state;
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <div>
              <h4 className="text-center">Поиск пользователей</h4>
              <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
              <form className="mb-2" onSubmit={e => this.handleSubmit(e)}>
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter chat name..."
                    aria-label="Create"
                    value={nickname}
                    onChange={event => this.setState({ nickname: event.target.value })}
                  />
                </div>
              </form>

              <UserList handleClick={id => this.handleStartDialogue(id)} list={foundUsers} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
