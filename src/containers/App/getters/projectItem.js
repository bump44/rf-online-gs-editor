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

import { getFiniteByTypeName } from '~/structs/item_types_utils';
import { POTION } from '~/structs/skillforce_types';
import { DEFAULT_STORAGE_PRICE_PERCENT } from '../constants';
import { getNextValues } from './nextValues';
import { getValue, getListValue } from './nextValue';
import * as projectBoxItemOut from './projectBoxItemOut';
import * as projectSkillForce from './projectSkillForce';
import { convItemModelClientToServer } from '~/utils/converters';

export const getIsRemoved = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['isRemoved']], def: false, fnc: isBoolean },
  );

export const getIsRemovedFully = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['isRemovedFully']], def: false, fnc: isBoolean },
  );

export const getName = (nextValue, { entry }) =>
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

export const getMoney = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nMoney'], ['client', 'nMoney']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getMoneyType = (nextValue, { entry, moneyTypes }) => {
  const value = getMoney(nextValue, { entry });
  return moneyTypes.find(val => val.get('value') === value);
};

export const getMoneyValue = (nextValue, { entry, moneyTypes }) => {
  const moneyType = getMoneyType(nextValue, { entry, moneyTypes });
  return getMoneyValueByMoneyType(nextValue, { entry }, { moneyType });
};

export const getMoneyValueByMoneyType = (
  nextValue,
  { entry },
  { moneyType },
) => {
  // unknown money type
  if (!moneyType) {
    return 0;
  }

  return getValue(
    nextValue,
    { entry },
    {
      fields: [
        ['server', moneyType.get('fieldName')],
        ['client', moneyType.get('fieldName')],
      ],
      def: 0,
      fnc: isInteger,
    },
  );
};

export const getMoneyValueByPercent = (
  nextValue,
  { entry, moneyTypes },
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

export const getStoragePrice = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStoragePrice'], ['client', 'nStoragePrice']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getStoragePricePercent = (
  nextValue,
  { entry, moneyTypes, localSettings },
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

export const getId = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['id']], def: undefined, fnc: isString },
  );

export const getType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['type']], def: undefined, fnc: isString },
  );

export const getIndex = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nIndex']], def: undefined, fnc: isInteger },
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

export const getCivilA = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'civil_a'], ['client', 'civil_a']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getCivilBM = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'civil_bm'], ['client', 'civil_bm']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getCivilBF = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'civil_bf'], ['client', 'civil_bf']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getCivilCM = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'civil_cm'], ['client', 'civil_cm']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getCivilCF = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'civil_cf'], ['client', 'civil_cf']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getDefFc = (nextValue, { entry }) =>
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

export const getDefFacing = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'fDefFacing'], ['client', 'fDefFacing']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getDefGap = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'fDefGap'], ['client', 'fDefGap']],
      def: 0.5,
      fnc: isNumber,
    },
  );

export const getExchange = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bExchange'], ['client', 'bExchange']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getSell = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bSell'], ['client', 'bSell']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getGround = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bGround'], ['client', 'bGround']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getGoldPoint = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nGoldPoint'], ['client', 'nGoldPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getKillPoint = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nKillPoint'], ['client', 'nKillPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getProcPoint = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nProcPoint'], ['client', 'nProcPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getStdPoint = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStdPoint'], ['client', 'nStdPoint']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getStdPrice = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStdPrice'], ['client', 'nStdPrice']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getLevel = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nLevelLim'], ['client', 'nLevelLim']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getItemGrade = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nItemGrade'], ['client', 'nItemGrade']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getItemGradeType = (nextValue, { entry, itemGradeTypes }) => {
  const value = getItemGrade(nextValue, { entry });
  return itemGradeTypes.find(val => val.get('value') === value);
};

export const getStoragePossible = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bStoragePossible'], ['client', 'bStoragePossible']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getSubType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nSubType'], ['client', 'nSubType']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getUpLevel = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nUpLevelLim'], ['client', 'nUpLevelLim']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getWP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nWPType'], ['client', 'nWPType']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getWPType = (nextValue, { entry, weaponTypes }) => {
  const value = getWP(nextValue, { entry });
  return weaponTypes.find(val => val.get('value') === value);
};

export const getClientCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'strCode']], def: '', fnc: isString },
  );

export const getClientTypeFinite = (nextValue, { entry }) => {
  const type = getType(nextValue, { entry });
  return getFiniteByTypeName(type);
};

export const getServerCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strCode']], def: '', fnc: isString },
  );

export const getRouteLink = (nextValue, { entry }) =>
  `/project/${getProjectId(nextValue, {
    entry,
  })}/items/${getId(nextValue, {
    entry,
  })}`;

export const getBoxItemOut = (nextValue, { entry, nextValues }) => {
  const boxItemOuts = getListValue(
    nextValue,
    { entry },
    { field: 'boxItemOuts' },
  );

  const strCode = getServerCode(nextValue, { entry });

  return boxItemOuts.find(
    boxItemOut =>
      projectBoxItemOut.getCode(getNextValues(nextValues, boxItemOut), {
        entry: boxItemOut,
      }) === strCode,
  );
};

export const getPotionItemEffect = (nextValue, { entry, nextValues }) => {
  const skillForces = getListValue(
    nextValue,
    { entry },
    { field: 'skillForces' },
  ).filter(
    skillForce =>
      projectSkillForce.getType(getNextValues(nextValues, skillForce), {
        entry: skillForce,
      }) === POTION,
  );

  // find by server code
  const serverEffectCode = getServerEffectCode(nextValue, { entry });

  if (serverEffectCode && serverEffectCode.length > 0) {
    const res = skillForces.find(
      skillForce =>
        projectSkillForce.getServerCode(getNextValues(nextValues, skillForce), {
          entry: skillForce,
        }) === serverEffectCode,
    );

    if (res) {
      return res;
    }
  }

  // find by client code
  const buf = Buffer.from([0, 0, 0, 0]);
  buf.writeInt32LE(getClientEffectCode(nextValue, { entry }));

  const clientEffectCode = buf.toString('hex');
  const convServerEffectCode = parseInt(
    clientEffectCode
      .split(/(.{2})/g)
      .reverse()
      .join(''),
    16,
  ).toString(16);

  return skillForces.find(
    skillForce =>
      projectSkillForce.getClientCode(getNextValues(nextValues, skillForce), {
        entry: skillForce,
      }) === clientEffectCode ||
      projectSkillForce.getServerCode(getNextValues(nextValues, skillForce), {
        entry: skillForce,
      }) === convServerEffectCode,
  );
};

export const getServerEffectCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strEffCode']], def: '', fnc: isString },
  );

export const getClientEffectCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'nEffCode']], def: 0, fnc: isInteger },
  );

export const getExpertTypeValue = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nExpertID${n}`], ['client', `nExpertID${n}`]],
      def: -1,
      fnc: isInteger,
    },
  );

export const getExpertTypeValueIsDisabled = (nextValue, { entry }, { n }) =>
  getExpertTypeValue(nextValue, { entry }, { n }) === -1;

export const getExpertType = (nextValue, { entry, expertTypes }, { n }) => {
  const value = getExpertTypeValue(nextValue, { entry }, { n });
  return expertTypes.find(expertType => expertType.get('value') === value);
};

export const getExpertValue = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nExpertLim${n}`], ['client', `nExpertLim${n}`]],
      def: -1,
      fnc: isInteger,
    },
  );

export const getEffectTypeValue = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nEffCode__${n}`], ['client', `nEffCode__${n}`]],
      def: 0,
      fnc: isInteger,
    },
  );

export const getEffectTypeValueIsDisabled = (nextValue, { entry }, { n }) =>
  getEffectTypeValue(nextValue, { entry }, { n }) === 0;

export const getEffectType = (nextValue, { entry, effectTypes }, { n }) => {
  const value = getEffectTypeValue(nextValue, { entry }, { n });
  return effectTypes.find(effectType => effectType.get('value') === value);
};

export const getEffectValue = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `fEffUnit__${n}`], ['client', `fEffUnit__${n}`]],
      def: -1,
      fnc: isNumber,
    },
  );

export const getItems = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'items' });

export const getSkillForces = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'skillForces' });

export const getBoxItemOuts = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'boxItemOuts' });

export const getResources = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'resources' });

export const getClientModel = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'strModel']], def: '', fnc: isString },
  );

export const getModel = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strModel']], def: '', fnc: isString },
  ) || convItemModelClientToServer(getClientModel(nextValue, { entry }));

export const getKindClt = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nKindClt'], ['client', 'nKindClt']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getFixPart = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nFixPart'], ['client', 'nFixPart']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getDefEffType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nDefEffType'], ['client', 'nDefEffType']],
      def: 0,
      fnc: isInteger,
    },
  );
