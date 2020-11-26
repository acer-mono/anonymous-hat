import React from 'react';
import PropTypes from 'prop-types';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isPrivate: false,
      error: '',
    };
  }

  validate() {
    this.setState({
      error: '',
    });
    if (this.state.title.length === 0) {
      this.setState({
        error: 'Введите название чата',
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.props.handleSubmit({ title: this.state.title, isPrivate: this.state.isPrivate });
      this.setState({ title: '', isPrivate: false });
    }
  }

  render() {
    const { title, isPrivate, error } = this.state;

    return (
      <>
        <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isPrivate}
              onChange={event => this.setState({ isPrivate: event.target.checked })}
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
              onChange={event => this.setState({ title: event.target.value })}
            />
          </div>
        </form>
      </>
    );
  }
}

ChatForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
