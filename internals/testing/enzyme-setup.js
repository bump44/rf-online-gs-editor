import { configure } from 'enzyme';
import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.window.getSelection = () => ({
  removeAllRanges: () => {},
  addRange: () => {},
});

global.document = window.document;
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
  selectNodeContents: (...args) => args,
});

global.navigator = {
  userAgent: 'node.js',
};

// eslint-disable-next-line
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};

// eslint-disable-next-line
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};

copyProps(window, global);
