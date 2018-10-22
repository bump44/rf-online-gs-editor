/**
 * Getting data on more important item fields
 */

import { isNumber, max } from 'lodash';
import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../constants';
import { getValue } from './nextValue';

/**
 * Return id
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getId = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.get('id') || entry.get('id') || undefined;

/**
 * Return index
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number|undefined
 */
export const getIndex = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nIndex']], def: undefined, fnc: isNumber },
  );

/**
 * Return project id
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getProjectId = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(['project', 'id']) ||
  entry.getIn(['project', 'id']) ||
  undefined;

/**
 * Return box item
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Immutable.Map|undefined
 */
export const getItem = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.get('item', entry.get('item')) || undefined;

export const getItems = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => nextValue.get('items', entry.get('items')) || IMMUTABLE_LIST;

export const getOutput = (...props) => ({
  code: getOutputCode(...props),
  count: getOutputCount(...props),
  prob: getOutputProb(...props),
  probPercent: getOutputProbPercent(...props),
  item: getOutputItem(...props),
  n: props[2].n,
});

export const getOutputItem = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) => {
  const strCode = getOutputCode(nextValue, { entry }, { n });
  const items = getItems(nextValue, { entry });
  return items.find(item => item.getIn(['server', 'strCode']) === strCode);
};

export const getOutputCode = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  nextValue.getIn(
    [`strItemCode__${n}_1`],
    entry.getIn([`strItemCode__${n}_1`]),
  ) || '';

export const getOutputProb = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  max([
    nextValue.getIn(
      [`nItemProb__${n}_3`],
      entry.getIn([`nItemProb__${n}_3`]),
    ) || 0,
    0,
  ]);

export const getOutputProbPercent = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) => (getOutputProb(nextValue, { entry }, { n }) / 10000) * 100;

export const getOutputCount = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  max([
    nextValue.getIn(
      [`nItemCount__${n}_2`],
      entry.getIn([`nItemCount__${n}_2`]),
    ) || 0,
    0,
  ]);

export const getOutputs = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  Array.from(Array(61)).map((_, index) =>
    getOutput(nextValue, { entry }, { n: index + 1 }),
  );

export const getOutputsProb = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  Array.from(Array(61)).reduce(
    (accumulator, _, index) =>
      accumulator + getOutputProb(nextValue, { entry }, { n: index + 1 }),
    0,
  );
