/**
 * Getting data on more important item fields
 */

import { max, parseInt, isNumber } from 'lodash';
import { isNullOrUndefined } from 'util';

import {
  DEFAULT_STORAGE_PRICE_PERCENT,
  IMMUTABLE_MAP,
  IMMUTABLE_LIST,
} from '../constants';
import { getFiniteByTypeName } from '../../../structs/item_types_utils';

/**
 * Return the most important title of the subject
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getName = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.getIn(
    ['clientNd', 'strName'],
    entry.getIn(
      [
        ['priorStrName'],
        ['clientNd', 'strName'],
        ['client', 'strName'],
        ['serverStr', 'strNameEN'],
        ['serverStr', 'strNameGLOBAL'],
        ['server', 'strName'],
      ].find(fieldSets => !isNullOrUndefined(entry.getIn(fieldSets))) ||
        'priorStrName',
    ),
  ) || '';

/**
 * Return moneyType
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *                       moneyTypes: list of money types
 *
 * @returns Immutable.Map|undefined
 */
export const getMoneyType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
) => {
  const value = nextValue.getIn(
    ['server', 'nMoney'],
    entry.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
      ) || ['server', 'nMoney'],
      0,
    ),
  );

  return moneyTypes.find(val => val.get('value') === value);
};

/**
 * Return moneyValue by current moneyType
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *                       moneyTypes: list of money types
 *
 * @returns Number
 */
export const getMoneyValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
) => {
  const moneyType = getMoneyType(nextValue, { entry, moneyTypes });

  // unknown money type
  if (!moneyType) {
    return 0;
  }

  return (
    parseInt(
      nextValue.getIn(
        ['server', moneyType.get('fieldName')],
        entry.getIn(
          [
            ['server', moneyType.get('fieldName')],
            ['client', moneyType.get('fieldName')],
          ].find(fieldSets => !isNullOrUndefined(entry.getIn(fieldSets))) || [
            'server',
            moneyType.get('fieldName'),
          ],
          0,
        ),
      ),
    ) || 0
  );
};

/**
 * Return moneyValue by current moneyType & percent
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *                       moneyTypes: list of money types
 * @param {Object} props percent: number of percent
 *                       valuation: use importance of currency
 *
 * @returns Number
 */
export const getMoneyValueByPercent = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, moneyTypes = IMMUTABLE_LIST },
  { percent = 0, valuation = true } = {},
) => {
  const moneyType = getMoneyType(nextValue, { entry, moneyTypes });

  // unknown money type
  if (!moneyType) {
    return 0;
  }

  const moneyValue = getMoneyValue(nextValue, { entry, moneyTypes });

  // calc value by valuation
  const value = moneyValue * (valuation ? moneyType.get('valuation', 1) : 1);
  return Math.ceil((value * percent) / 100);
};

/**
 * Return storage price
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getStoragePrice = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  parseInt(
    nextValue.getIn(
      ['server', 'nStoragePrice'],
      entry.getIn(
        [['server', 'nStoragePrice'], ['client', 'nStoragePrice']].find(
          fieldSets => !isNullOrUndefined(entry.getIn(fieldSets)),
        ) || ['server', 'nStoragePrice'],
        0,
      ),
    ),
  ) || 0;

/**
 * Return storage price percent of current money value
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *                       moneyTypes: list of money types
 *                       localSettings: map local program settings
 * @param {Object} props valuation: use importance of currency
 *
 * @returns Number
 */
export const getStoragePricePercent = (
  nextValue = IMMUTABLE_MAP,
  {
    entry = IMMUTABLE_MAP,
    moneyTypes = IMMUTABLE_LIST,
    localSettings = IMMUTABLE_MAP,
  },
  { valuation = true },
) => {
  const moneyType = getMoneyType(nextValue, { entry, moneyTypes });
  const moneyValue = getMoneyValue(nextValue, { entry, moneyTypes });
  const storagePrice = getStoragePrice(nextValue, { entry });
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
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getId = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.get('id') || entry.get('id') || undefined;

/**
 * Return type (face, upper, ...)
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String|undefined
 */
export const getType = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  nextValue.get('type') || entry.get('type') || undefined;

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

export const getCivilA = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['server', 'civil_a'],
    entry.getIn(
      [['server', 'civil_a'], ['client', 'civil_a']].find(
        fieldSets => entry.getIn(fieldSets) !== undefined,
      ) || ['server', 'civil_a'],
    ),
  );

export const getClientCode = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(['client', 'strCode'], entry.getIn(['client', 'strCode'])) ||
  '';

export const getClientTypeFinite = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => {
  const type = nextValue.get('type', entry.get('type'));
  return getFiniteByTypeName(type);
};

export const getServerCode = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(['server', 'strCode'], entry.getIn(['server', 'strCode'])) ||
  '';
