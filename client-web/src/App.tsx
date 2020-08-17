import React from 'react';

import { GlobalStyle } from './styles';
import { ChatContextProvider } from './contexts/ChatContext';
import InputMessage from './components/InputMessage';
import ChatHistory from './components/ChatHistory';
import Container from './components/Container';

export default function App() {
  return (
    <ChatContextProvider>
      <GlobalStyle />
      <Container>
        <ChatHistory />
        <InputMessage />
      </Container>
    </ChatContextProvider>
  );
}
