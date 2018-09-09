import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    overflow: initial;
  }

  body {
    background: #f5f5f5;
    color: #5b626b;
  }

  .columns {
    margin-right: -0.55rem;
  }

  .card-content {
    padding: 10px;
  }

  .title {
    color: #5b626b;
    &.m-0 {
      margin: 0;
    }
  }

  .p-10 {
    padding: 10px;
  }

  .p-0 {
    padding: 0;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .m-0 {
    margin: 0;
  }

  .card .media:not(:last-child) {
    margin-bottom: 0;
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
