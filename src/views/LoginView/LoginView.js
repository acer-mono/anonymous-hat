import React from 'react';
import styles from './styles.modules.css';
import apiServices from '../../apiServices';

class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      result: null,
      error: null,
    };
  }

  handleSend(e) {
    this.setState({
      result: null,
      error: null,
    });
    apiServices.auth
      .login({
        nickname: this.state.user,
        password: this.state.password,
      })
      .then(() => {
        this.setState({ result: 'Пользователь успешно залогинился' });
        setTimeout(() => this.props.history.push('/profile'), 2000);
      })
      .catch(error => this.setState({ error: 'ERROR: ' + error.response.data.error }));
    e.preventDefault();
  }

  render() {
    const { user, password, error, result } = this.state;

    let alert;
    if (error) {
      alert = (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }
    if (result) {
      alert = (
        <div className="alert alert-success" role="alert">
          {result}
        </div>
      );
    }

    return (
      <div className={styles.main}>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <h4 className="text-center">Вход</h4>
          {alert}
          <input
            id="nick"
            name="nick"
            value={user}
            className="form-control mb-4"
            type="text"
            placeholder="Your name..."
            onChange={e => this.setState({ user: e.target.value })}
          />
          <input
            className="form-control mb-4"
            type="password"
            value={password}
            id="password"
            name="password"
            placeholder="Your password..."
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="submit"
            className="btn btn-primary btn-block"
            id="send"
            value="Войти"
            onClick={e => this.handleSend(e)}
          />
        </form>
      </div>
    );
  }
}

export default LoginView;
