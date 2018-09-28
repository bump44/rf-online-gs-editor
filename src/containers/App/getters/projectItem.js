/**
 * Getting data on more important item fields
 */

import { max, parseInt } from 'lodash';
import { isNullOrUndefined, isUndefined } from 'util';

import {
  DEFAULT_STORAGE_PRICE_PERCENT,
  IMMUTABLE_MAP,
  IMMUTABLE_LIST,
} from '../constants';

/**
 * Return the most important title of the subject
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String
 */
export const getName = (nextValues = IMMUTABLE_MAP, { item = IMMUTABLE_MAP }) =>
  nextValues.getIn(
    ['clientNd', 'strName'],
    item.getIn(
      [
        ['priorStrName'],
        ['clientNd', 'strName'],
        ['client', 'strName'],
        ['serverStr', 'strNameEN'],
        ['serverStr', 'strNameGLOBAL'],
        ['server', 'strName'],
      ].find(fieldSets => !isNullOrUndefined(item.getIn(fieldSets))) ||
        'priorStrName',
    ),
  ) || '';

/**
 * Return moneyType
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *                       moneyTypes: list of money types
 *
 * @returns Immutable.Map|undefined
 */
export const getMoneyType = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
) => {
  const value = nextValues.getIn(
    ['server', 'nMoney'],
    item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
      ) || ['server', 'nMoney'],
      0,
    ),
  );

  return moneyTypes.find(val => val.get('value') === value);
};

/**
 * Return moneyValue by current moneyType
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *                       moneyTypes: list of money types
 *
 * @returns Number
 */
export const getMoneyValue = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
) => {
  const moneyType = getMoneyType(nextValues, { item, moneyTypes });

  // unknown money type
  if (!moneyType) {
    return 0;
  }

  const nextValue = nextValues.getIn(['server', moneyType.get('fieldName')]);

  const currValue = item.getIn(
    [
      ['server', moneyType.get('fieldName')],
      ['client', moneyType.get('fieldName')],
    ].find(fieldSets => !isNullOrUndefined(item.getIn(fieldSets))) || [
      'server',
      moneyType.get('fieldName'),
    ],
    0,
  );

  const value = parseInt(!isUndefined(nextValue) ? nextValue : currValue) || 0;
  return value;
};

/**
 * Return moneyValue by current moneyType & percent
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *                       moneyTypes: list of money types
 * @param {Object} props percent: number of percent
 *                       valuation: use importance of currency
 *
 * @returns Number
 */
export const getMoneyValueByPercent = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
  { percent = 0, valuation = true } = {},
) => {
  const moneyType = getMoneyType(nextValues, { item, moneyTypes });

  // unknown money type
  if (!moneyType) {
    return 0;
  }

  const moneyValue = getMoneyValue(nextValues, { item, moneyTypes });

  // calc value by valuation
  const value = moneyValue * (valuation ? moneyType.get('valuation', 1) : 1);
  return Math.ceil((value * percent) / 100);
};

/**
 * Return storage price
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number
 */
export const getStoragePrice = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) => {
  const nextValue = nextValues.getIn(['server', 'nStoragePrice']);

  const currValue = item.getIn(
    [['server', 'nStoragePrice'], ['client', 'nStoragePrice']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['server', 'nStoragePrice'],
    0,
  );

  const value =
    parseInt(!isNullOrUndefined(nextValue) ? nextValue : currValue) || 0;

  return value;
};

/**
 * Return storage price percent of current money value
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *                       moneyTypes: list of money types
 *                       localSettings: map local program settings
 * @param {Object} props valuation: use importance of currency
 *
 * @returns Number
 */
export const getStoragePricePercent = (
  nextValues = IMMUTABLE_MAP,
  {
    item = IMMUTABLE_MAP,
    moneyTypes = IMMUTABLE_LIST,
    localSettings = IMMUTABLE_MAP,
  },
  { valuation = true },
) => {
  const moneyType = getMoneyType(nextValues, { item, moneyTypes });
  const moneyValue = getMoneyValue(nextValues, { item, moneyTypes });
  const storagePrice = getStoragePrice(nextValues, { item });
  const worth =
    (valuation && moneyType ? moneyType.get('valuation', 1) : 1) || 1;

  const min = max([100 / worth, 5]);

  if (moneyValue < min || storagePrice <= 0) {
    const def = localSettings.get(DEFAULT_STORAGE_PRICE_PERCENT);
    return def >= 0 && def <= 100 ? def : 0;
  }

  const storagePriceNext = storagePrice / worth;
  return (storagePriceNext / moneyValue) * 100;
};

/**
 * Return id
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getId = (nextValues = IMMUTABLE_MAP, { item = IMMUTABLE_MAP }) =>
  nextValues.get('id') || item.get('id') || undefined;

/**
 * Return type (face, upper, ...)
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getType = (nextValues = IMMUTABLE_MAP, { item = IMMUTABLE_MAP }) =>
  nextValues.get('type') || item.get('type') || undefined;

/**
 * Return index
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns Number|undefined
 */
export const getIndex = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) => nextValues.get('nIndex') || item.get('nIndex') || undefined;

/**
 * Return project id
 * @param {Object} nextValues next item values
 * @param {Object} props item: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getProjectId = (
  nextValues = IMMUTABLE_MAP,
  { item = IMMUTABLE_MAP },
) =>
  nextValues.getIn(['project', 'id']) ||
  item.getIn(['project', 'id']) ||
  undefined;
