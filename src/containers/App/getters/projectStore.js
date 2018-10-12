import { isNullOrUndefined, isNumber } from 'util';
import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../constants';
import { getTypeNameByFinite } from '../../../structs/item_types_utils';
import * as projectItem from './projectItem';

/**
 * Return the most important title of the subject
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getName = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.get(
    'priorStrName',
    entry.getIn(
      [
        ['priorStrName'],
        ['client', 'strStoreNPCname'],
        ['server', 'strStoreNPCname'],
      ].find(fieldSets => !isNullOrUndefined(entry.getIn(fieldSets))) ||
        'priorStrName',
    ),
  ) || '';

/**
 * Return the most important last title of the subject
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getLastName = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['client', 'strStoreNPClastName'],
    entry.getIn(
      [['client', 'strStoreNPClastName']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['client', 'strStoreNPClastName'],
    ),
  ) || '';

/**
 * Return vendor trade type
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getTrade = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['client', 'nStoreTrade'],
    entry.getIn(
      [['server', 'nStoreTrade'], ['client', 'nStoreTrade']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['server', 'nStoreTrade'],
    ),
  ) || 0;

/**
 * Return use angle
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Boolean
 */
export const getUseAngle = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['client', 'bSetNPCangle'],
    entry.getIn(
      [['client', 'bSetNPCangle']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['client', 'bSetNPCangle'],
    ),
  );

/**
 * Return vendor size
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getSize = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.getIn(
    ['client', 'fStoreNPCsize'],
    entry.getIn(
      [['client', 'fStoreNPCsize']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['client', 'fStoreNPCsize'],
    ),
  ) || 1;

/**
 * Return vendor angle
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getAngle = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['client', 'fStoreNPCangle'],
    entry.getIn(
      [['client', 'fStoreNPCangle']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['client', 'fStoreNPCangle'],
    ),
  ) || 0;

export const getArrayItems = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => nextValue.get('arrayItems', entry.get('arrayItems')) || IMMUTABLE_LIST;

/**
 * Return vendor list item type from client cell
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Number
 */
export const getItemListClientType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValue.getIn(
    ['client', `nItemListType__${n}_1`],
    entry.getIn(['client', `nItemListType__${n}_1`]),
  ) || 0;

/**
 * Return vendor list item code from client cell
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns String
 */
export const getItemListClientCode = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValue.getIn(
    ['client', `strItemList__${n}_2`],
    entry.getIn(['client', `strItemList__${n}_2`]),
  ) || '';

/**
 * Return vendor list item from client cell
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Immutable.Map|undefined
 */
export const getItemListClient = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, nextValues = IMMUTABLE_MAP },
  { n = 1 },
) => {
  const finite = getItemListClientType(nextValue, { entry }, { n });
  const typeName = getTypeNameByFinite(finite);
  const code = getItemListClientCode(nextValue, { entry }, { n });
  if (!typeName || !code) {
    return undefined;
  }

  const arrayItems = getArrayItems(nextValue, { entry });
  const arrayItem = arrayItems.find(
    value =>
      projectItem.getClientCode(nextValues.get(value.get('id')), {
        entry: value,
      }) === code &&
      typeName ===
        projectItem.getType(nextValues.get(value.get('id')), {
          entry: value,
        }),
  );

  return arrayItem;
};

/**
 * Return vendor list item from server cell
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Immutable.Map|undefined
 */
export const getItemListServer = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, nextValues = IMMUTABLE_MAP },
  { n = 1 },
) => {
  const code = getItemListServerCode(nextValue, { entry }, { n });
  if (!code) {
    return undefined;
  }

  const arrayItems = getArrayItems(nextValue, { entry });
  return arrayItems.find(
    arrayItem =>
      projectItem.getServerCode(nextValues.get(arrayItem.get('id')), {
        entry: arrayItem,
      }) === code,
  );
};

/**
 * Return vendor list item code from server cell
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns String
 */
export const getItemListServerCode = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 },
) =>
  nextValue.getIn(
    ['server', `strItemCode__${n}`],
    entry.getIn(['server', `strItemCode__${n}`]),
  ) || '';

/**
 * Return vendor list item all data
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-200
 *
 * @returns Object
 */
export const getItemList = (...props) => ({
  client: getItemListClient(...props),
  server: getItemListServer(...props),
  clientType: getItemListClientType(...props),
  clientCode: getItemListClientCode(...props),
  serverCode: getItemListServerCode(...props),
  n: props[2].n,
});

/**
 * Return vendor list items all data
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Array
 */
export const getItemsList = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, nextValues = IMMUTABLE_MAP },
) =>
  Array.from(Array(200)).map((_, index) =>
    getItemList(nextValue, { entry, nextValues }, { n: index + 1 }),
  );

/**
 * Return vendor list items count
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getItemsListCount = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['server', 'nStoreListCount'],
    entry.getIn(
      [['server', 'nStoreListCount'], ['client', 'nStoreLISTcount']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['server', 'nStoreListCount'],
    ),
  ) || 0;

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
 * Return index
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number|undefined
 */
export const getIndex = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => {
  const value = nextValue.get('nIndex', entry.get('nIndex'));
  return isNumber(value) ? value : undefined;
};

/**
 * Return vendor button type value
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-10
 *
 * @returns Number
 */
export const getButtonValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  nextValue.getIn(
    ['server', `nNpcClass__${n}`],
    entry.getIn(
      [['server', `nNpcClass__${n}`], ['client', `nNpcClass__${n}`]].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['server', `nNpcClass__${n}`],
    ),
  ) || 0;

/**
 * Return vendor button type
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 * @param {Object} props n: cell 1-10
 *
 * @returns Immutable.Map|undefined
 */
export const getButtonType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, buttonTypes = IMMUTABLE_LIST },
  { n = 1 } = {},
) => {
  const value = getButtonValue(nextValue, { entry }, { n });
  return buttonTypes.find(buttonType => buttonType.get('value') === value);
};
