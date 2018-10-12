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
  nextValue,
  { entry, moneyTypes, localSettings, ...props },
) => {
  if (!localSettings.get(AUTO_RECALC_STORAGE_PRICE_IF_MONEY_VALUE_CHANGED)) {
    return newValues => newValues;
  }

  const moneyType = getMoneyType(nextValue, {
    entry,
    moneyTypes,
    localSettings,
  });

  if (!moneyType) {
    return newValues => newValues;
  }

  const currentPercent = getStoragePricePercent(nextValue, {
    entry,
    moneyTypes,
    localSettings,
  });

  return newValues =>
    Resolvers.storagePrice(
      newValues,
      getMoneyValueByPercent(
        newValues,
        { entry, moneyTypes, localSettings, ...props },
        { percent: currentPercent },
      ),
      { entry, moneyTypes, localSettings, ...props },
    );
};

const Resolvers = {
  name: (item, value) => {
    let nextItem = item;
    PROJECT_ITEM_NAME_FIELDS.forEach(nameField => {
      nextItem = nextItem.setIn(nameField, value);
    });
    return nextItem;
  },
  exchange: (item, value) =>
    item
      .setIn(['client', 'bExchange'], value)
      .setIn(['server', 'bExchange'], value),
  sell: (item, value) =>
    item.setIn(['client', 'bSell'], value).setIn(['server', 'bSell'], value),
  ground: (item, value) =>
    item
      .setIn(['client', 'bGround'], value)
      .setIn(['server', 'bGround'], value),
  storagePossible: (item, value) =>
    item
      .setIn(['client', 'bStoragePossible'], value)
      .setIn(['server', 'bStoragePossible'], value),
  money: (item, value) =>
    item.setIn(['client', 'nMoney'], value).setIn(['server', 'nMoney'], value),
  stdPrice: (item, value, props) =>
    calcStoragePrice(item, props)(
      item
        .setIn(['client', 'nStdPrice'], value)
        .setIn(['server', 'nStdPrice'], value),
    ),
  stdPoint: (item, value, props) =>
    calcStoragePrice(item, props)(
      item
        .setIn(['client', 'nStdPoint'], value)
        .setIn(['server', 'nStdPoint'], value),
    ),
  goldPoint: (item, value, props) =>
    calcStoragePrice(item, props)(
      item
        .setIn(['client', 'nGoldPoint'], value)
        .setIn(['server', 'nGoldPoint'], value),
    ),
  procPoint: (item, value, props) =>
    calcStoragePrice(item, props)(
      item
        .setIn(['client', 'nProcPoint'], value)
        .setIn(['server', 'nProcPoint'], value),
    ),
  killPoint: (item, value, props) =>
    calcStoragePrice(item, props)(
      item
        .setIn(['client', 'nKillPoint'], value)
        .setIn(['server', 'nKillPoint'], value),
    ),
  storagePrice: (item, value) =>
    item
      .setIn(['client', 'nStoragePrice'], value)
      .setIn(['server', 'nStoragePrice'], value),
  itemGrade: (item, value) =>
    item
      .setIn(['client', 'nItemGrade'], value)
      .setIn(['server', 'nItemGrade'], value),
  levelLim: (item, value) =>
    item
      .setIn(['client', 'nLevelLim'], value)
      .setIn(['server', 'nLevelLim'], value),
  upLevelLim: (item, value) =>
    item
      .setIn(['client', 'nUpLevelLim'], value)
      .setIn(['server', 'nUpLevelLim'], value),
  defence: (item, value) =>
    item
      .setIn(['server', 'nDefFc'], value)
      .setIn(['server', 'fDefFc'], value)
      .setIn(['client', 'nDefFc'], value),
  defenceGap: (item, value) =>
    item
      .setIn(['server', 'fDefGap'], value)
      .setIn(['client', 'fDefGap'], value),
  defenceFacing: (item, value) =>
    item
      .setIn(['server', 'fDefFacing'], value)
      .setIn(['client', 'fDefFacing'], value),
  wpType: (item, value) =>
    item
      .setIn(['server', 'nWPType'], value)
      .setIn(['client', 'nWPType'], value),
  subType: (item, value) =>
    item
      .setIn(['server', 'nSubType'], value)
      .setIn(['client', 'nSubType'], value),
  civilBM: (item, value) =>
    item
      .setIn(['server', 'civil_bm'], value)
      .setIn(['client', 'civil_bm'], value),
  civilBF: (item, value) =>
    item
      .setIn(['server', 'civil_bf'], value)
      .setIn(['client', 'civil_bf'], value),
  civilCM: (item, value) =>
    item
      .setIn(['server', 'civil_cm'], value)
      .setIn(['client', 'civil_cm'], value),
  civilCF: (item, value) =>
    item
      .setIn(['server', 'civil_cf'], value)
      .setIn(['client', 'civil_cf'], value),
  civilA: (item, value) =>
    item
      .setIn(['server', 'civil_a'], value)
      .setIn(['client', 'civil_a'], value),
  expertTypeValue: (item, { value, n }) =>
    item
      .setIn(['server', `nExpertID${n}`], value)
      .setIn(['client', `nExpertID${n}`], value),
  expertValue: (item, { value, n }) =>
    item
      .setIn(['server', `nExpertLim${n}`], value)
      .setIn(['client', `nExpertLim${n}`], value),
  effectTypeValue: (item, { value, n }) =>
    item
      .setIn(['server', `nEffCode__${n}`], value)
      .setIn(['client', `nEffCode__${n}`], value),
  effectValue: (item, { value, n }) =>
    item
      .setIn(['server', `fEffUnit__${n}`], value)
      .setIn(['client', `fEffUnit__${n}`], value),
};

export default Resolvers;
