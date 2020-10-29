import React from 'react';
import styles from './styles.modules.css';
import apiServices from '../../apiServices';

class RegistrationView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      passwordConfirm: '',
      error: null,
      success: null,
    };
  }

  handleSend(e) {
    this.setState({
      error: null,
      success: null,
    });

    const { user, password } = this.state;
    apiServices.user
      .create({
        nickname: user,
        password: password,
      })
      .then(() => this.setState({ success: 'Пользователь успешно зарегистрирован' }))
      .then(() => setTimeout(() => this.props.history.push('/login'), 2000))
      .catch(error => this.setState({ error: `ERROR: ${error.response.data.error}` }));
    e.preventDefault();
  }

  render() {
    const { user, password, passwordConfirm, error, success } = this.state;

    let alert;
    if (error) {
      alert = (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }
    if (success) {
      alert = (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      );
    }
    return (
      <div className={styles.main}>
        <form className={styles.form} onSubmit={e => this.handleSend(e)}>
          <h4 className="text-center">Регистрация</h4>
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
            className="form-control mb-4"
            type="password"
            value={passwordConfirm}
            id="password"
            name="password"
            placeholder="Confirm your password..."
            onChange={e => this.setState({ passwordConfirm: e.target.value })}
          />
          <input
            type="submit"
            className="btn btn-primary btn-block"
            id="send"
            value="Зарегистрироваться"
            onClick={e => this.handleSend(e)}
          />
        </form>
      </div>
    );
  }
}

export default RegistrationView;
