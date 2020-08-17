import React from 'react';
import { Main } from './styles';

const Container: React.FC = ({ children }) => {
  return (
    <Main>
      {children}
    </Main>
  );
};

export default Container;
