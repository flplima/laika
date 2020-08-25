import React, { useState, useEffect } from 'react';
import socket from '../services/socket';
import { Message } from '../types';

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

export const ChatContext = React.createContext<ChatContextType>(
  {} as ChatContextType,
);

export const ChatContextProvider: React.FC = ({ children }) => {
  const [ messages, setMessages ] = useState<Message[]>([]);

  const appendMessage = (message: Message) => {
    setMessages(state => [ message, ...state ]);
  };
  
  const sendMessage = (text: string) => {
    socket.emit('message', { text });
  };

  useEffect(() => {
    socket.on('message', appendMessage);
    return () => {
      socket.off('message', appendMessage);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ messages, sendMessage }}
      children={children}
    />
  );
};
