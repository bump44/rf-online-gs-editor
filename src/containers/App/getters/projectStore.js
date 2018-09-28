import { isNullOrUndefined } from 'util';
import { IMMUTABLE_MAP } from '../constants';

/**
 * Return the most important title of the subject
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String
 */
export const getName = (nextValues = IMMUTABLE_MAP, { item = IMMUTABLE_MAP }) =>
  nextValues.get(
    'priorStrName',
    item.getIn(
      [
        ['priorStrName'],
        ['client', 'strStoreNPCname'],
        ['server', 'strStoreNPCname'],
      ].find(fieldSets => !isNullOrUndefined(item.getIn(fieldSets))) ||
        'priorStrName',
    ),
  ) || '';

/**
 * Return the most important last title of the subject
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String
 */
export const getLastName = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  nextValues.getIn(
    ['client', 'strStoreNPClastName'],
    item.getIn(
      [['client', 'strStoreNPClastName']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['client', 'strStoreNPClastName'],
    ),
  ) || '';

/**
 * Return vendor trade type
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number
 */
export const getTrade = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  nextValues.getIn(
    ['client', 'nStoreTrade'],
    item.getIn(
      [['server', 'nStoreTrade'], ['client', 'nStoreTrade']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['server', 'nStoreTrade'],
    ),
  ) || 0;

/**
 * Return use angle
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Boolean
 */
export const getUseAngle = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  !!nextValues.getIn(
    ['client', 'bSetNPCangle'],
    item.getIn(
      [['client', 'bSetNPCangle']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['client', 'bSetNPCangle'],
    ),
  );

/**
 * Return vendor size
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number
 */
export const getSize = (nextValues = IMMUTABLE_MAP, { item = IMMUTABLE_MAP }) =>
  nextValues.getIn(
    ['client', 'fStoreNPCsize'],
    item.getIn(
      [['client', 'fStoreNPCsize']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['client', 'fStoreNPCsize'],
    ),
  ) || 1;

/**
 * Return vendor angle
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number
 */
export const getAngle = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  nextValues.getIn(
    ['client', 'fStoreNPCangle'],
    item.getIn(
      [['client', 'fStoreNPCangle']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['client', 'fStoreNPCangle'],
    ),
  ) || 0;

/**
 * Return vendor list item type from client cell
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Number
 */
export const getItemListClientType = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValues.getIn(
    ['client', `nItemListType__${n}_1`],
    item.getIn(['client', `nItemListType__${n}_1`]),
  ) || 0;

/**
 * Return vendor list item code from client cell
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns String
 */
export const getItemListClientCode = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValues.getIn(
    ['client', `strItemList__${n}_2`],
    item.getIn(['client', `strItemList__${n}_2`]),
  ) || '';

/**
 * Return vendor list item from client cell
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Immutable.Map|undefined
 */
export const getItemListClient = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValues.getIn(
    ['client', `itemList__${n}`],
    item.getIn(['client', `itemList__${n}`]),
  ) || undefined;

/**
 * Return vendor list item code from server cell
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns String
 */
export const getItemListServerCode = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValues.getIn(
    ['server', `strItemCode__${n}`],
    item.getIn(['server', `strItemCode__${n}`]),
  ) || '';

/**
 * Return vendor list item all data
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Object
 */
export const getItemList = (...props) => ({
  client: getItemListClient(...props),
  clientType: getItemListClientType(...props),
  clientCode: getItemListClientCode(...props),
  serverCode: getItemListServerCode(...props),
  n: props[2].n,
});

/**
 * Return vendor list items all data
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Array
 */
export const getItemsList = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  Array.from(Array(200)).map((_, index) =>
    getItemList(nextValues, { item }, { n: index + 1 }),
  );

/**
 * Return vendor list items count
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number
 */
export const getItemsListCount = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  nextValues.getIn(
    ['server', 'nStoreListCount'],
    item.getIn(
      [['server', 'nStoreListCount'], ['client', 'nStoreLISTcount']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['server', 'nStoreListCount'],
    ),
  ) || 0;
