import React from 'react';
import PropTypes from 'prop-types';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
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
      this.props.handleSubmit({ title: this.state.title });
      this.setState({ title: '' });
    }
  }

  render() {
    const { title, error } = this.state;

    return (
      <>
        <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
        <form onSubmit={e => this.handleSubmit(e)}>
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
