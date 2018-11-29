import { createGlobalStyle } from 'styled-components';

const base = `
  html {
    overflow: initial;
    height: 100%;
  }

  body {
    background: #f5f5f5;
    color: #5b626b;
    height: 100%;
    overflow: hidden;
    // font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 400;
  }

  .ui.fullscreen.modal {
    left: initial !important;
  }

  .ReactVirtualized__Grid {
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 0 !important;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0 !important;
    background: rgba(141, 141, 141, 0.8);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const modifiers = (() => {
  let i = 0;
  const arr = [];

  while (i < 55) {
    arr.push(`
      .p-${i} {
        padding: ${i}px
      }
      .pt-${i} {
        padding-top: ${i}px
      }
      .pr-${i} {
        padding-right: ${i}px
      }
      .pb-${i} {
        padding-bottom: ${i}px
      }
      .pl-${i} {
        padding-left: ${i}px
      }

      .m-${i} {
        margin: ${i}px
      }
      .mt-${i} {
        margin-top: ${i}px
      }
      .mr-${i} {
        margin-right: ${i}px
      }
      .mb-${i} {
        margin-bottom: ${i}px
      }
      .ml-${i} {
        margin-left: ${i}px
      }
    `);

    i += 5;
  }

  arr.push(`
    .is-fullheight {
      height: 100vh;

      &.calc-50px {
        height: calc(100vh - 50px);
      }

      &.calc-60px {
        height: calc(100vh - 60px);
      }

      &.calc-70px {
        height: calc(100vh - 70px);
      }

      &.calc-80px {
        height: calc(100vh - 80px);
      }

      &.calc-90px {
        height: calc(100vh - 90px);
      }
    }

    .pr-3 {
      padding-right: 3px;
    }

    .pb-4 {
      padding-bottom: 4px;
    }

    .gray {
      color: gray;
    }
  `);

  return arr.join('\n');
})();

export default createGlobalStyle`${[base, modifiers].join('\n')}`;
