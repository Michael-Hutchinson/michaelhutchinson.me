import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"

import {createGlobalStyle, ThemeProvider} from 'styled-components'
import * as theme from './styles/theme'

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Karla:400,400i");
  html,
  body {
    font-family: ${props => props.theme.font};
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
`

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