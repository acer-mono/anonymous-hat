import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import style from './styles.modules.css';

class Chat extends React.Component {
  isOwner() {
    return this.props.userId === this.props.chat.userId;
  }

  isParticipant() {
    return this.props.chat.participants.includes(this.props.userId);
  }

  renderChat() {
    if (this.isOwner()) {
      return (
        <>
          <div className={style.wrapper}>
            <a href="/" onClick={e => this.innerClickHandle(e)}>
              {this.props.chat.title}
            </a>
            <div>
              <button className="btn btn-outline-dark" onClick={() => console.log('edit')}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => this.props.deleteHandler(this.props.chat.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </>
      );
    }
    if (this.isParticipant()) {
      return (
        <>
          <div className={style.wrapper}>
            <a href="/" onClick={e => this.innerClickHandle(e)}>
              {this.props.chat.title}
            </a>
            <button
              className="btn btn-outline-warning"
              onClick={() => this.props.deleteHandler(this.props.chat.id)}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <div className={style.wrapper}>
          <span>{this.props.chat.title}</span>
          <button
            className="btn btn-outline-success"
            onClick={() => this.props.joinHandler(this.props.chat.id)}>
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </div>
      </>
    );
  }

  innerClickHandle(e) {
    e.preventDefault();
    this.props.goHandler(this.props.chat.id);
  }

  render() {
    return <div className="list-group-item list-group-item-action">{this.renderChat()}</div>;
  }
}

Chat.propTypes = {
  userId: PropTypes.string.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
  }),
  goHandler: PropTypes.func,
  joinHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
};

export default Chat;
