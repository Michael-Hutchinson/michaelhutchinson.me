import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import * as theme from "./styles/theme";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Karla:400,400i");
  html,
  body {
    font-family: ${(props) => props.theme.font};
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: black;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme.empressGrey};
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0.5px;
  }
  p {
    color: ${(props) => props.theme.empressGrey};
    line-height: 25px;
  }
  a {
    color: black;
    transition: 0.5s;
    text-decoration: none;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
