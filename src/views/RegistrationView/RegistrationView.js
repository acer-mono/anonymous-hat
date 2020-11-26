import React from 'react';
import styles from './styles.modules.css';
import { Formik } from 'formik';
import apiServices from '@/apiServices';

class RegistrationView extends React.Component {
  constructor() {
    super();
    this.state = {
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
    const { error, result } = this.state;

    return (
      <div id="register-form" className={styles.main}>
        <Formik
          initialValues={{ nickname: '', password: '', passwordConfirm: '' }}
          validate={values => {
            const errors = {};
            if (!values.nickname) {
              errors.nickname = 'Введите никнейм';
            }
            if (values.password.length < 7) {
              errors.password = 'Длина пароля должна быть больше 6 символов';
            }
            if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = 'Введенные пароли не совпадают';
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
                <div className="errorEmptyNickname" style={{ color: 'red' }}>
                  {errors.nickname}
                </div>
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
                <div className="errorShortPassword" style={{ color: 'red' }}>
                  {errors.password}
                </div>
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
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="errorPasswordConfirm" style={{ color: 'red' }}>
                  {errors.passwordConfirm}
                </div>
              )}
              <input
                className="form-control mb-4"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm your password..."
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
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
