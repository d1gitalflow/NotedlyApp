import { createGlobalStyle } from 'styled-components';
//normalize é para garantir a consistencia de HTML entre browsers
import normalize from 'normalize.css';

//Design Global

//podemos exportar createGlobalStyle como js template literal, alternativa seria:
//const GlobalStyle = createGlobalStyle`CSS-aqui`; e default export GlobalStyle;
//e importar na App.js


//NOTA: isto é exportado.. mas para ser utilizado é preciso importar o react lib
export default createGlobalStyle`
  ${normalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    background-color: #fff;
    line-height: 1.4;
  }

  a:link,
  a:visited {
    color: #0077cc;
  }

  a:hover,
  a:focus {
    color: #004499;
  }

  code,
  pre {
    max-width: 100%;
    overflow: auto;
    margin: 0 auto;
  }
`;