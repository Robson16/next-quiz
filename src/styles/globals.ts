import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }

  body,
  input,
  textarea,
  button {
    font: 400 1rem "Roboto", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;
