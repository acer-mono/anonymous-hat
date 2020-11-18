import React from 'react';
import styles from './styles.modules.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleSend(event) {
    event.preventDefault();
    this.props.postMessage({
      content: this.state.content,
    });
    this.setState({ content: '' });
  }

  render() {
    const { content } = this.state;
    return (
      <>
        <form className={styles.fields} onSubmit={e => this.handleSend(e)}>
          <textarea
            className="form-control mb-4"
            value={content}
            id="message"
            name="message"
            rows="3"
            placeholder="Your message..."
            onChange={e => this.setState({ content: e.target.value })}
          />
          <input type="submit" className="btn btn-primary btn-block" id="send" value="Отправить" />
        </form>
      </>
    );
  }
}

export default Form;
