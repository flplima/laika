import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  padding: 8px;
  background: #2f2e33;
`;

export const Input = styled.input`
  flex: 1;
  height: 48px;
  background: #ffffff22;
  border: none;
  border-radius: 24px;
  margin: 0;
  padding: 0px 16px;
  color: #fff;
`;

export const SendButton = styled.button`
  border: 0;
  color: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background: linear-gradient(145deg, #ffb71c, #e69a17);
  margin-left: 16px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  img {
    width: 100%;
    width: 24px;
    height: 24px;
    margin-left: 4px;
  }
  :active {
    background: #ffab1a;
    box-shadow: inset 2px 2px 4px #00000066, inset -2px -2px 4px #ffffff66;
    img {
      margin-left: 6px;
      margin-top: 2px;
    }
  }
`;