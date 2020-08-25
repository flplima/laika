import React, { useContext } from 'react';

import { MessagesList, Message } from './styles';
import { ChatContext } from '../../contexts/ChatContext';

const ChatHistory: React.FC = () => {
  const { messages } = useContext(ChatContext);

  return (
    <MessagesList>
      {messages.map(message => (
        <Message key={message._id} fromUser={message.fromUser}>
          <p>
            {message.text}
          </p>
        </Message>
      ))}
    </MessagesList>
  );
}

export default ChatHistory;
