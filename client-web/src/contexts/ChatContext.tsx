import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

interface ChatContextType {
  messages: any[];
  sendMessage: (message: any) => void;
}

export const ChatContext = React.createContext<ChatContextType>(
  {} as ChatContextType,
);

export const ChatContextProvider: React.FC = ({ children }) => {
  const [ messages, setMessages ] = useState<any[]>([]);

  const appendMessage = (message: any) => {
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
