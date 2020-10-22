import React from 'react';

class Message extends React.Component {
  render() {
    const { user, message } = this.props;
    return (
      <>
        <div className="card mb-3">
          <div className="card-header font-weight-bold">{user}</div>
          <div className="card-body">{message}</div>
        </div>
      </>
    );
  }
}

export default Message;
