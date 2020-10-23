import React from 'react';
import styles from './styles.modules.css';

class RegistrationView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      passwordConfirm: '',
    };
  }

  handleSend() {
    console.log('Create Handler!');
  }

  render() {
    const { user, password, passwordConfirm } = this.state;
    return (
      <div className={styles.main}>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <h4 className="text-center">Регистрация</h4>
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
            onClick={() => this.handleSend()}
          />
        </form>
      </div>
    );
  }
}

export default RegistrationView;
