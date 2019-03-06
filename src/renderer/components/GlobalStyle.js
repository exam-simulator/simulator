import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
  html {
    font-size: 10px;
  }
  body {
    padding: 0;
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgrey;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`
