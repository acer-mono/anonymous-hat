import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import style from './styles.modules.css';
import ChatEditView from '@/views/ChatEditView';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialog: false,
    };
  }

  isOwner() {
    return this.props.userId === this.props.chat.userId;
  }

  isParticipant() {
    return this.props.chat.participants.includes(this.props.userId);
  }

  renderChat() {
    const { isOpenDialog } = this.state;
    if (this.isOwner()) {
      return (
        <>
          <div className={style.wrapper}>
            <a href="/" onClick={e => this.innerClickHandle(e)}>
              {this.props.chat.title}
            </a>
            <div>
              <button
                className="btn btn-outline-dark"
                onClick={() => this.setState({ isOpenDialog: true })}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => this.props.deleteHandler(this.props.chat.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          {isOpenDialog && (
            <>
              <div className={style.createChatBackground} />
              <div className={style.createChat}>
                <a className={style.close} onClick={() => this.setState({ isOpenDialog: false })} />
                <div className="mt-2 mb-1">
                  <h5>Изменить название</h5>
                  <ChatEditView chat={this.props.chat} />
                </div>
              </div>
            </>
          )}
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
              onClick={() => this.props.leaveHandler(this.props.chat)}>
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
