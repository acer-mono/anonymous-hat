import React from 'react';
import Message from '@/components/Message';

function MessagesList({ messages }) {
  return (
    <>
      {messages.map(message => (
        <Message user={message.nickname} message={message.content} key={message.id} />
      ))}
    </>
  );
}

export default MessagesList;
