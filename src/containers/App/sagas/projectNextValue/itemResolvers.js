import {
  PROJECT_ITEM_NAME_FIELDS,
  AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED,
} from '../../constants';

import {
  getMoneyType,
  getStoragePricePercent,
  getMoneyValueByPercent,
} from '../../getters/projectItem';

const calcStoragePrice = (
  nextValues,
  { item, moneyTypes, localSettings, ...props },
) => {
  if (!localSettings.get(AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED)) {
    return newValues => newValues;
  }

  const moneyType = getMoneyType(nextValues, {
    item,
    moneyTypes,
    localSettings,
  });

  if (!moneyType) {
    return newValues => newValues;
  }

  const currentPercent = getStoragePricePercent(nextValues, {
    item,
    moneyTypes,
    localSettings,
  });

  return newValues =>
    Resolvers.storagePrice(
      newValues,
      getMoneyValueByPercent(
        newValues,
        { item, moneyTypes, localSettings, ...props },
        { percent: currentPercent },
      ),
      { item, moneyTypes, localSettings, ...props },
    );
};

const Resolvers = {
  name: (item, nextValue) => {
    let nextMap = item;
    PROJECT_ITEM_NAME_FIELDS.forEach(nameField => {
      nextMap = nextMap.setIn(nameField, nextValue);
    });
    return nextMap;
  },
  exchange: (item, nextValue) =>
    item
      .setIn(['client', 'bExchange'], nextValue)
      .setIn(['server', 'bExchange'], nextValue),
  sell: (item, nextValue) =>
    item
      .setIn(['client', 'bSell'], nextValue)
      .setIn(['server', 'bSell'], nextValue),
  ground: (item, nextValue) =>
    item
      .setIn(['client', 'bGround'], nextValue)
      .setIn(['server', 'bGround'], nextValue),
  storagePossible: (item, nextValue) =>
    item
      .setIn(['client', 'bStoragePossible'], nextValue)
      .setIn(['server', 'bStoragePossible'], nextValue),
  money: (item, nextValue) =>
    item
      .setIn(['client', 'nMoney'], nextValue)
      .setIn(['server', 'nMoney'], nextValue),
  stdPrice: (nextValues, payload, props) =>
    calcStoragePrice(nextValues, props)(
      nextValues
        .setIn(['client', 'nStdPrice'], payload)
        .setIn(['server', 'nStdPrice'], payload),
    ),
  stdPoint: (nextValues, payload, props) =>
    calcStoragePrice(nextValues, props)(
      nextValues
        .setIn(['client', 'nStdPoint'], payload)
        .setIn(['server', 'nStdPoint'], payload),
    ),
  goldPoint: (nextValues, payload, props) =>
    calcStoragePrice(nextValues, props)(
      nextValues
        .setIn(['client', 'nGoldPoint'], payload)
        .setIn(['server', 'nGoldPoint'], payload),
    ),
  procPoint: (nextValues, payload, props) =>
    calcStoragePrice(nextValues, props)(
      nextValues
        .setIn(['client', 'nProcPoint'], payload)
        .setIn(['server', 'nProcPoint'], payload),
    ),
  killPoint: (nextValues, payload, props) =>
    calcStoragePrice(nextValues, props)(
      nextValues
        .setIn(['client', 'nKillPoint'], payload)
        .setIn(['server', 'nKillPoint'], payload),
    ),
  storagePrice: (item, nextValue) =>
    item
      .setIn(['client', 'nStoragePrice'], nextValue)
      .setIn(['server', 'nStoragePrice'], nextValue),
  itemGrade: (item, nextValue) =>
    item
      .setIn(['client', 'nItemGrade'], nextValue)
      .setIn(['server', 'nItemGrade'], nextValue),
  levelLim: (item, nextValue) =>
    item
      .setIn(['client', 'nLevelLim'], nextValue)
      .setIn(['server', 'nLevelLim'], nextValue),
  upLevelLim: (item, nextValue) =>
    item
      .setIn(['client', 'nUpLevelLim'], nextValue)
      .setIn(['server', 'nUpLevelLim'], nextValue),
  defence: (item, nextValue) =>
    item
      .setIn(['server', 'nDefFc'], nextValue)
      .setIn(['server', 'fDefFc'], nextValue)
      .setIn(['client', 'nDefFc'], nextValue),
  defenceGap: (item, nextValue) =>
    item
      .setIn(['server', 'fDefGap'], nextValue)
      .setIn(['client', 'fDefGap'], nextValue),
  defenceFacing: (item, nextValue) =>
    item
      .setIn(['server', 'fDefFacing'], nextValue)
      .setIn(['client', 'fDefFacing'], nextValue),
  wpType: (item, nextValue) =>
    item
      .setIn(['server', 'nWPType'], nextValue)
      .setIn(['client', 'nWPType'], nextValue),
  subType: (item, nextValue) =>
    item
      .setIn(['server', 'nSubType'], nextValue)
      .setIn(['client', 'nSubType'], nextValue),
  civilBM: (item, nextValue) =>
    item
      .setIn(['server', 'civil_bm'], nextValue)
      .setIn(['client', 'civil_bm'], nextValue),
  civilBF: (item, nextValue) =>
    item
      .setIn(['server', 'civil_bf'], nextValue)
      .setIn(['client', 'civil_bf'], nextValue),
  civilCM: (item, nextValue) =>
    item
      .setIn(['server', 'civil_cm'], nextValue)
      .setIn(['client', 'civil_cm'], nextValue),
  civilCF: (item, nextValue) =>
    item
      .setIn(['server', 'civil_cf'], nextValue)
      .setIn(['client', 'civil_cf'], nextValue),
  civilA: (item, nextValue) =>
    item
      .setIn(['server', 'civil_a'], nextValue)
      .setIn(['client', 'civil_a'], nextValue),
};

export default Resolvers;
