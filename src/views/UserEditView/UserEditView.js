import React from 'react';
import { Formik } from 'formik';
import apiServices from '@/apiServices';

class UserEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      result: null,
      isDialogOpen: this.props.isDialogOpen,
    };
  }

  handleSend(values) {
    apiServices.user
      .edit(values.password)
      .then(() => this.setState({ result: 'Пароль успешно изменен' }))
      .catch(error => this.setState({ error: `ERROR: ${error.response.data.error}` }));
  }

  render() {
    const { error, result } = this.state;

    return (
      <div id="register-form">
        <Formik
          initialValues={{ password: '', passwordConfirm: '' }}
          validate={values => {
            const errors = {};
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
            <form onSubmit={handleSubmit}>
              {error ? <div className="alert alert-danger">{error}</div> : null}
              {result ? <div className="alert alert-success">{result}</div> : null}
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
                value="Сохранить"
              />
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserEditView;
