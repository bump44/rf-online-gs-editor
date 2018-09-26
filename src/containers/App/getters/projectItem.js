import max from 'lodash/max';
import { isNullOrUndefined } from 'util';
import { DEFAULT_STORAGE_PRICE_PERCENT } from '../constants';

export const getName = (nextValues, { item }) => {
  const nextValue = nextValues.getIn(['nextValue', 'clientNd', 'strName']);

  const currValue = item.getIn(
    [
      ['priorStrName'],
      ['clientNd', 'strName'],
      ['client', 'strName'],
      ['serverStr', 'strNameEN'],
      ['serverStr', 'strNameGLOBAL'],
      ['server', 'strName'],
    ].find(fieldSets => !isNullOrUndefined(item.getIn(fieldSets))) ||
      'priorStrName',
    '',
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getMoneyType = (nextValues, { item, moneyTypes }) => {
  const nextValue = nextValues.getIn(['server', 'nMoney']);

  const currValue = item.getIn(
    [['server', 'nMoney'], ['client', 'nMoney']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['server', 'nMoney'],
    0,
  );

  const value = !isNullOrUndefined(nextValue) ? nextValue : currValue;

  return moneyTypes.find(val => val.get('value') === value);
};

export const getMoneyValue = (nextValues, { item, moneyTypes }) => {
  const moneyType = getMoneyType(nextValues, { item, moneyTypes });

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

  const value =
    parseInt(!isNullOrUndefined(nextValue) ? nextValue : currValue, 10) || 0;

  return value;
};

export const getMoneyValueByPercent = (
  nextValues,
  { item, moneyTypes, localSettings },
  { percent = 0 } = {},
) => {
  const moneyType = getMoneyType(nextValues, {
    item,
    moneyTypes,
  });

  if (!moneyType) {
    return 0;
  }

  const moneyValue = getMoneyValue(nextValues, {
    item,
    moneyTypes,
    localSettings,
  });

  const increaseValue = moneyType.get('valuation') || 1;
  const value = moneyValue * increaseValue;

  return Math.ceil((value * percent) / 100);
};

export const getStoragePrice = (nextValues, { item }) => {
  const nextValue = nextValues.getIn(['server', 'nStoragePrice']);

  const currValue = item.getIn(
    [['server', 'nStoragePrice'], ['client', 'nStoragePrice']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['server', 'nStoragePrice'],
    0,
  );

  return (
    parseInt(!isNullOrUndefined(nextValue) ? nextValue : currValue, 10) || 0
  );
};

export const getStoragePricePercent = (
  nextValues,
  { item, moneyTypes, localSettings },
) => {
  const moneyType = getMoneyType(nextValues, { item, moneyTypes });
  const moneyValue = getMoneyValue(nextValues, { item, moneyTypes });
  const storagePrice = getStoragePrice(nextValues, { item });
  const valuation = (moneyType ? moneyType.get('valuation') : 1) || 1;
  const min = max([100 / valuation, 5]);

  if (moneyValue < min || storagePrice <= 0) {
    const def = localSettings.get(DEFAULT_STORAGE_PRICE_PERCENT);
    return def >= 0 && def <= 100 ? def : 0;
  }

  const storagePriceNext = storagePrice / valuation;
  return (storagePriceNext / moneyValue) * 100;
};
