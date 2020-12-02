import React from 'react';
import styles from './styles.modules.css';
import { Formik } from 'formik';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSend(values) {
    this.props.postMessage({
      content: values.content,
    });
  }

  render() {
    const { error } = this.state;
    return (
      <>
        <Formik
          initialValues={{ content: '' }}
          validate={values => {
            const errors = {};
            if (!values.content) {
              errors.content = 'Сообщение не может быть пустым';
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            this.handleSend(values);
            resetForm({ content: '' });
          }}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className={styles.fields} onSubmit={handleSubmit}>
              {error ? <div className="alert alert-danger">{error}</div> : null}
              {errors.content && touched.content && (
                <div style={{ color: 'red' }}>{errors.content}</div>
              )}
              <textarea
                className="form-control mb-4"
                id="content"
                name="content"
                rows="3"
                placeholder="Your message..."
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type="submit"
                className="btn btn-primary btn-block"
                id="send"
                value="Отправить"
              />
            </form>
          )}
        </Formik>
      </>
    );
  }
}

export default Form;
