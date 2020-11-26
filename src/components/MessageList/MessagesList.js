import React from 'react';
import Message from '@/components/Message';

class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <>
        {messages.map(message => (
          <Message user={message.nickname} message={message.content} key={message.id} />
        ))}
      </>
    );
  }
}

export default MessagesList;
