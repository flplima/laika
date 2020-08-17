import styled, { css } from 'styled-components';

export const MessagesList = styled.ul`
  background-color: #333238;
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Message = styled.li<{ fromUser?: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin: 8px;
  font-size: 14px;
  p {
    padding: 16px;
    max-width: 80%;
    border-radius: 4px 16px 16px;
    background: #605f67;
    color: #fff;
    box-shadow:  2px 2px 4px #00000033;
  }

  ${props => props.fromUser && css`
    justify-content: flex-end;
    p {
      background: #ffab1a;
      border-radius: 16px 16px 4px;
    }
  `}
`;
