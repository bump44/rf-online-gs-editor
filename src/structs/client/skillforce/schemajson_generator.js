/* eslint-disable no-console */
import readerStruct from './reader_struct';

const schemeJSON = {};

function getObjectClass(obj) {
  if (obj && obj.toString) {
    const arr = obj.toString().match(/function\s*(\w+)/);

    if (arr && arr.length === 2) {
      return arr[1];
    }
  }

  return undefined;
}

readerStruct.forEach(vals => {
  console.group('Struct', vals.type);

  vals.block.toSchema().forEach(field => {
    const already =
      schemeJSON[field.name] !== undefined
        ? schemeJSON[field.name].type
        : undefined;

    const next = getObjectClass(field.props.type);

    if (schemeJSON[field.name] && already !== next) {
      console.warn(
        'Has fields whose types do not match the ones already created',
        field.name,
        'already',
        already,
        'next',
        next,
      );
    }

    if (!schemeJSON[field.name]) {
      schemeJSON[field.name] = { type: next };
    }
  });

  console.groupEnd();
});

export default JSON.stringify(schemeJSON);
