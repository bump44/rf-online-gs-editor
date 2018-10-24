/* eslint-disable no-console */
import { pull } from 'lodash';
import * as ITEM_TYPES from '~/structs/item_types';

const readerStructs = [];

pull(
  Object.values(ITEM_TYPES),
  ITEM_TYPES.COMBINEDATA,
  ITEM_TYPES.MAKEDATA,
  ITEM_TYPES.UNK3,
).forEach(type => {
  try {
    readerStructs.push(
      require(`./${type}_reader`).struct, // eslint-disable-line
    );
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
});

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

readerStructs.forEach(readerStruct => {
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
});

export default JSON.stringify(schemeJSON);
