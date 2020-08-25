import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased !important;
    background: #1e1d21;
  }
  body html #root {
    height: 100%;
  }
`;
