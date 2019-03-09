import { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
  html {
    font-size: ${theme.fontSize}
  }
  body {
    padding: 0;
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: ${theme.scrollbar};
    height: ${theme.scrollbar};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.grey[5]};
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`
