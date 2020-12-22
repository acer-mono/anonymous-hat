import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../Chat';

function ChatList({ userId, list, goHandler, joinHandler, deleteHandler, leaveHandler }) {
  return (
    <div className="list-group">
      {list.map(chat => (
        <Chat
          userId={userId}
          chat={chat}
          goHandler={goHandler}
          joinHandler={joinHandler}
          deleteHandler={deleteHandler}
          leaveHandler={leaveHandler}
          key={chat.id}
        />
      ))}
    </div>
  );
}

ChatList.propTypes = {
  userId: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      participants: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  goHandler: PropTypes.func,
  joinHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  leaveHandler: PropTypes.func,
};

export default ChatList;
