import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Karla:400,400i");
  html,
  body {
    font-family: "Karla", sans-serif;
    margin: 0;
    background: ${({ theme }) => theme.background};
    transition: all 0.50s linear;
  }
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.background};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.title};
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0.5px;
  }
  p {
    color: ${({ theme }) => theme.title};
    line-height: 25px;
  }
  a {
    color: ${({ theme }) => theme.title};
    transition: 0.5s;
    text-decoration: none;
  }
`;

export default GlobalStyle;
