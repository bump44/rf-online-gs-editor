/**
 * Getting data on more important item fields
 */

import {
  max,
  parseInt,
  isNumber,
  isBoolean,
  isInteger,
  isString,
} from 'lodash';

import { isNullOrUndefined } from 'util';

import { getFiniteByTypeName } from '../../../structs/item_types_utils';
import { getValue } from './nextValue';

import {
  DEFAULT_STORAGE_PRICE_PERCENT,
  IMMUTABLE_MAP,
  IMMUTABLE_LIST,
} from '../constants';

export const getIsRemoved = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['isRemoved']], def: false, fnc: isBoolean },
  );

export const getIsRemovedFully = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['isRemovedFully']], def: false, fnc: isBoolean },
  );

/**
 * Return the most important title of the subject
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getName = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [
        ['priorStrName'],
        ['clientND', 'strName'],
        ['client', 'strName'],
        ['serverStr', 'strNameEN'], // FIXME: locale
        ['serverStr', 'strNameGLOBAL'],
        ['server', 'strName'],
      ],
      def: '',
      fnc: isString,
    },
  );

/**
 * Return money (number-type)
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns Number
 */
export const getMoney = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nMoney'], ['client', 'nMoney']],
      def: 0,
      fnc: isInteger,
    },
  );

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
  const value = getMoney(nextValue, { entry });
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
  return getMoneyValueByMoneyType(nextValue, { entry }, { moneyType });
};

/**
 * Return moneyValue by moneyType
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *                       moneyTypes: list of money types
 *
 * @returns Number
 */
export const getMoneyValueByMoneyType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { moneyType },
) => {
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
  { valuation = true } = {},
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
      [['server', 'civil_a'], ['client', 'civil_a']].find(fieldSets =>
        isBoolean(entry.getIn(fieldSets)),
      ) || ['server', 'civil_a'],
    ),
  );

export const getCivilBM = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['server', 'civil_bm'],
    entry.getIn(
      [['server', 'civil_bm'], ['client', 'civil_bm']].find(fieldSets =>
        isBoolean(entry.getIn(fieldSets)),
      ) || ['server', 'civil_bm'],
    ),
  );

export const getCivilBF = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['server', 'civil_bf'],
    entry.getIn(
      [['server', 'civil_bf'], ['client', 'civil_bf']].find(fieldSets =>
        isBoolean(entry.getIn(fieldSets)),
      ) || ['server', 'civil_bf'],
    ),
  );

export const getCivilCM = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['server', 'civil_cm'],
    entry.getIn(
      [['server', 'civil_cm'], ['client', 'civil_cm']].find(fieldSets =>
        isBoolean(entry.getIn(fieldSets)),
      ) || ['server', 'civil_cm'],
    ),
  );

export const getCivilCF = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  !!nextValue.getIn(
    ['server', 'civil_cf'],
    entry.getIn(
      [['server', 'civil_cf'], ['client', 'civil_cf']].find(fieldSets =>
        isBoolean(entry.getIn(fieldSets)),
      ) || ['server', 'civil_cf'],
    ),
  );

export const getDefFc = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [
        ['server', 'nDefFc'],
        ['server', 'fDefFc'],
        ['client', 'nDefFc'],
      ],
      def: 0,
      fnc: isNumber,
    },
  );

export const getDefFacing = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'fDefFacing'], ['client', 'fDefFacing']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getDefGap = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'fDefGap'], ['client', 'fDefGap']],
      def: 0.5,
      fnc: isNumber,
    },
  );

export const getExchange = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bExchange'], ['client', 'bExchange']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getSell = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bSell'], ['client', 'bSell']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getGround = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bGround'], ['client', 'bGround']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getGoldPoint = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nGoldPoint'], ['client', 'nGoldPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getKillPoint = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nKillPoint'], ['client', 'nKillPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getProcPoint = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nProcPoint'], ['client', 'nProcPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getStdPoint = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStdPoint'], ['client', 'nStdPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getStdPrice = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStdPrice'], ['client', 'nStdPrice']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getLevel = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nLevelLim'], ['client', 'nLevelLim']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getItemGrade = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nItemGrade'], ['client', 'nItemGrade']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getItemGradeType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, itemGradeTypes = IMMUTABLE_LIST },
) => {
  const value = getItemGrade(nextValue, { entry });
  return itemGradeTypes.find(val => val.get('value') === value);
};

export const getStoragePossible = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bStoragePossible'], ['client', 'bStoragePossible']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getSubType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nSubType'], ['client', 'nSubType']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getUpLevel = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nUpLevelLim'], ['client', 'nUpLevelLim']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getWP = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nWPType'], ['client', 'nWPType']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getWPType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, weaponTypes = IMMUTABLE_LIST },
) => {
  const value = getWP(nextValue, { entry });
  return weaponTypes.find(val => val.get('value') === value);
};

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

export const getRouteLink = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  `/project/${getProjectId(nextValue, {
    entry,
  })}/items/${getId(nextValue, {
    entry,
  })}`;

export const getBoxItemOut = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => {
  const boxItemOuts =
    nextValue
      .get('boxItemOuts', IMMUTABLE_LIST)
      .concat(entry.get('boxItemOuts')) || IMMUTABLE_LIST;

  const strCode = getServerCode(nextValue, { entry });
  return boxItemOuts.find(boxItemOut => boxItemOut.get('strCode') === strCode);
};

export const getExpertTypeValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nExpertID${n}`], ['client', `nExpertID${n}`]],
      def: -1,
      fnc: isInteger,
    },
  );

export const getExpertTypeValueIsDisabled = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) => getExpertTypeValue(nextValue, { entry }, { n }) === -1;

export const getExpertType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, expertTypes = IMMUTABLE_LIST },
  { n = 1 } = {},
) => {
  const value = getExpertTypeValue(nextValue, { entry }, { n });
  return expertTypes.find(expertType => expertType.get('value') === value);
};

export const getExpertValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nExpertLim${n}`], ['client', `nExpertLim${n}`]],
      def: -1,
      fnc: isInteger,
    },
  );

export const getEffectTypeValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nEffCode__${n}`], ['client', `nEffCode__${n}`]],
      def: 0,
      fnc: isInteger,
    },
  );

export const getEffectTypeValueIsDisabled = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) => getEffectTypeValue(nextValue, { entry }, { n }) === 0;

export const getEffectType = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP, effectTypes = IMMUTABLE_LIST },
  { n = 1 } = {},
) => {
  const value = getEffectTypeValue(nextValue, { entry }, { n });
  return effectTypes.find(effectType => effectType.get('value') === value);
};

export const getEffectValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { n = 1 } = {},
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `fEffUnit__${n}`], ['client', `fEffUnit__${n}`]],
      def: -1,
      fnc: isNumber,
    },
  );
