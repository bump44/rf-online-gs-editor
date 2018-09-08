import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    overflow: initial;
  }

  .p-10 {
    padding: 10px;
  }

  @media screen and (min-width: 1088px) {
    .container.is-fluid {
      margin-left: 0px;
      margin-right: 0px;
      max-width: none;
      width: auto;
    }
  }
`;
