import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 400px;
  margin: 10vh auto;
  box-shadow: 0px 0px 5px #111;
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
`;
