import React, { useState, useContext, useRef } from 'react';
import { Main, Input, SendButton } from './styles';
import { ChatContext } from '../../contexts/ChatContext';

const InputMessage: React.FC = () => {
  const { sendMessage } = useContext(ChatContext);
  const [ text, setText ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const sendOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendAndReset();
    }
  };

  const sendAndReset = () => {
    if (text) {
      sendMessage(text);
      setText('');
    }
    inputRef.current?.focus();
  }

  return (
    <Main>
      <Input
        value={text}
        ref={inputRef}
        onChange={onChange}
        onKeyUp={sendOnEnter}
        placeholder='Type a message'
      />
      <SendButton onClick={sendAndReset}>
        <img
          src='/send.svg'
          alt='Send icon'
        />
      </SendButton>
    </Main>
  )
}

export default InputMessage;
