import React from 'react';
import styles from './styles.modules.css';
import { Formik } from 'formik';
import apiServices from '../../apiServices';

class RegistrationView extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordConfirm: '',
      error: null,
      result: null,
    };
  }

  handleSend(values) {
    apiServices.user
      .create(values)
      .then(() => this.setState({ result: 'Пользователь успешно зарегистрирован' }))
      .then(() => setTimeout(() => this.props.history.push('/login'), 2000))
      .catch(error => this.setState({ error: `ERROR: ${error.response.data.error}` }));
  }

  render() {
    const { passwordConfirm, error, result } = this.state;

    return (
      <div className={styles.main}>
        <Formik
          initialValues={{ nickname: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.nickname) {
              errors.nickname = 'Введите никнейм';
            }
            if (!values.password) {
              errors.password = 'Введите пароль';
            }
            if (values.password.length < 7) {
              errors.password = 'Длина пароля должна быть больше 6 символов';
            }
            return errors;
          }}
          onSubmit={values => {
            this.handleSend(values);
          }}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h4 className="text-center">Регистрация</h4>
              {error ? <div className="alert alert-danger">{error}</div> : null}
              {result ? <div className="alert alert-success">{result}</div> : null}
              {errors.nickname && touched.nickname && (
                <div style={{ color: 'red' }}>{errors.nickname}</div>
              )}
              <input
                id="nick"
                className="form-control mb-4"
                type="text"
                name="nickname"
                placeholder="Your name..."
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div style={{ color: 'red' }}>{errors.password}</div>
              )}
              <input
                className="form-control mb-4"
                type="password"
                name="password"
                placeholder="Your password..."
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
              />
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default RegistrationView;
