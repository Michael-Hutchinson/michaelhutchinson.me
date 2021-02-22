import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --black: #000000;
    --black-shadow: rgba(0, 0, 0, 0.1);
    --font-sans: "Karla", sans-serif;
    --font-mono: "Roboto Mono", monospace;
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
    color: ${({ theme }) => theme.text};
    font-family: var(--font-sans);
    margin: 0;
    scroll-behavior: smooth;
  }
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    height: 0.313rem;
    width: 0.313rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.title};
  }
  ::placeholder {
    color: ${({ theme }) => theme.link};
    font-family: var(--font-mono);
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
    line-height: 1.563rem;
    margin: 0 0 0.938rem;
  }
  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
  }
  main {
    padding: 0 9.375rem;
    @media (max-width: 48rem) {
      padding: 0 3.125rem;
    }
  }
  section {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: 62.5rem;
    min-height: 100vh;
    padding: 6.25rem 0;
  }
  #tsparticles {
    position: fixed;
  }
  .navBackground {
    background: ${({ theme }) => theme.background};
    box-shadow:0 40px 100px rgba(0,0,0,.2);
    transition: all ease-in-out 0.5s;
  }
  .modalImage {
    width: 100%;
    border: 0.063rem solid ${({ theme }) => theme.link};
    border-radius: 0.25rem;
    padding: 0.313rem;
  }
`;

export default GlobalStyle;
