import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ChatForm(props) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  function validate() {
    setError('');
    if (title.length === 0) {
      setError('Введите название чата');
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validate()) {
      props.handleSubmit({ title: title, isPrivate: isPrivate });
      setTitle('');
      setIsPrivate(false);
    }
  }

  return (
    <>
      <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isPrivate}
            onChange={event => setIsPrivate(event.target.checked)}
            id="isPrivate"
          />
          <label className="form-check-label" htmlFor="isPrivate">
            Секретный
          </label>
        </div>
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <button className="btn btn-outline-success" type="submit">
              Create
            </button>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="Enter chat name..."
            aria-label="Create"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
      </form>
    </>
  );
}

ChatForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
