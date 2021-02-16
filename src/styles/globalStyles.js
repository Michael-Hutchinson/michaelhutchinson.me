import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --black: #000000;
    --black-shadow: rgba(0, 0, 0, 0.1);
    --font-main: "Karla", sans-serif;
    --font-links: "SF Mono", monospace;
    --gold: #E3AE4A;
    --gold-shadow: rgba(227, 174, 74, 0.1);
    --light-navy: #233554;
    --light-slate: #8892B0;
    --navy: #0A192F;
    --slate: #AFAFBF;
    --white: #E6F1FF;
  }

  html,
  body {
    background: ${({ theme }) => theme.background};
    font-family: var(--font-main);
    margin: 0;
    scroll-behavior: smooth;
  }
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.title};
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
  }
  p {
    color: ${({ theme }) => theme.text};
    line-height: 25px;
  }
  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
  }
  section {
    margin: 0px auto;
    max-width: 80%;
    padding: 100px 0px;
  }
  #tsparticles {
    position: fixed;
  }
`;

export default GlobalStyle;
