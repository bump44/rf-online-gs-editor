/**
 * Getting data on more important item fields
 */

import { isNumber, isInteger, isString, max } from 'lodash';

import { getNextValues } from './nextValues';
import { getValue, getMapValue, getListValue } from './nextValue';
import * as projectItem from './projectItem';

export const getId = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['id']], def: undefined, fnc: isString },
  );

export const getIndex = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nIndex']], def: undefined, fnc: isNumber },
  );

export const getProjectId = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['projectId'], ['project', 'id']],
      def: undefined,
      fnc: isString,
    },
  );

export const getCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strCode']], def: '', fnc: isString },
  );

export const getItem = (nextValue, { entry }) =>
  getMapValue(nextValue, { entry }, { field: 'item' });

export const getItems = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'items' });

export const getOutput = (...props) => ({
  code: getOutputCode(...props),
  count: getOutputCount(...props),
  prob: getOutputProb(...props),
  probPercent: getOutputProbPercent(...props),
  item: getOutputItem(...props),
  n: props[2].n,
});

export const getOutputItem = (
  nextValue,
  { entry, nextValues },
  { n = 1 } = {},
) => {
  const strCode = getOutputCode(nextValue, { entry }, { n });
  const items = getItems(nextValue, { entry });

  return items.find(
    item =>
      projectItem.getServerCode(getNextValues(nextValues, item), {
        entry: item,
      }) === strCode,
  );
};

export const getOutputCode = (nextValue, { entry }, { n = 1 } = {}) =>
  getValue(
    nextValue,
    { entry },
    { fields: [[`strItemCode__${n}_1`]], def: '', fnc: isString },
  );

export const getOutputProb = (nextValue, { entry }, { n = 1 } = {}) =>
  max([
    getValue(
      nextValue,
      { entry },
      { fields: [[`nItemProb__${n}_3`]], def: 0, fnc: isInteger },
    ),
    0,
  ]);

export const getOutputProbPercent = (nextValue, { entry }, { n = 1 } = {}) =>
  (getOutputProb(nextValue, { entry }, { n }) / 10000) * 100;

export const getOutputCount = (nextValue, { entry }, { n = 1 } = {}) =>
  max([
    getValue(
      nextValue,
      { entry },
      { fields: [[`nItemCount__${n}_2`]], def: 0, fnc: isInteger },
    ),
    0,
  ]);

export const getOutputs = (nextValue, { entry }) =>
  Array.from(Array(61)).map((_, index) =>
    getOutput(nextValue, { entry }, { n: index + 1 }),
  );

export const getOutputsProb = (nextValue, { entry }) =>
  Array.from(Array(61)).reduce(
    (accumulator, _, index) =>
      accumulator + getOutputProb(nextValue, { entry }, { n: index + 1 }),
    0,
  );
