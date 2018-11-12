import { isBoolean, isInteger, isString, isNull, isNumber } from 'lodash';

import { getValue, isNotNullOrUndefined } from './nextValue';

export const getName = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [
        ['client', 'strKorName'],
        ['client', 'strEngName'],
        ['client', 'strMastKorName'],
        ['client', 'strMastEngName'],
        ['server', 'strKorName'],
        ['server', 'strEngName'],
        ['server', 'strMastKorName'],
        ['server', 'strMastEngName'],
      ],
    },
  );

export const getActivate = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bActivate'], ['client', 'bActivate']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getCumulType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bCumulType'], ['client', 'bCumulType']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getEnable = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bEnable'], ['client', 'bEnable']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getFixshield = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'bFixshield'], ['client', 'bFixshield']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getNeedHP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nNeedHP'], ['client', 'nNeedHP']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getNeedFP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nNeedFP'], ['client', 'nNeedFP']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getNeedSP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nNeedSP'], ['client', 'nNeedSP']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getNeedItemCode = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [[`itmNeedItemCode__${n}_1`]], def: '', fnc: isString },
  );

export const getNeedItemCount = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [[`nNeedItemCount__${n}_2`]], def: 0, fnc: isInteger },
  );

export const getServerCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strCode']], def: '', fnc: isString },
  );

export const getClientCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'strCode']], def: '', fnc: isString },
  );

export const getType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['type']], def: '', fnc: isString },
  );

export const getClass = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nClass'], ['client', 'nClass']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getIconIDX = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nIconIDX'], ['client', 'nIconIDX']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getMastIndex = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nMastIndex'], ['client', 'nMastIndex']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getLv = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nLv'], ['client', 'nLv']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getServerUsableRace = (
  nextValue,
  { entry },
  { asArray = false, def = '000000' } = {},
) => {
  const srv = getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strUsableRace']], def, fnc: isString },
  );

  if (asArray) {
    return Array.from(Array(6)).map((_, index) => !!srv[index]);
  }

  return srv;
};

export const getUsableRaceBM = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[0];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceBM']], def: false, fnc: isBoolean },
  );
};

export const getUsableRaceBF = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[1];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceBF']], def: false, fnc: isBoolean },
  );
};

export const getUsableRaceCM = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[2];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceCM']], def: false, fnc: isBoolean },
  );
};

export const getUsableRaceCF = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[3];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceCF']], def: false, fnc: isBoolean },
  );
};

export const getUsableRaceAM = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[4];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceAM']], def: false, fnc: isBoolean },
  );
};

export const getUsableRaceAF = (
  nextValue,
  { entry },
  { onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerUsableRace(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv)) {
      return srv[5];
    }
  }

  return getValue(
    nextValue,
    { entry },
    { fields: [['client', 'bUsableRaceAF']], def: false, fnc: isBoolean },
  );
};

export const getUsableRace = (
  nextValue,
  { entry },
  { asArray = false } = {},
) => {
  const srv = getServerUsableRace(nextValue, { entry }, { asArray, def: null });

  if (!isNull(srv)) {
    return srv;
  }

  const clt = [
    getUsableRaceBM,
    getUsableRaceBF,
    getUsableRaceCM,
    getUsableRaceCF,
    getUsableRaceAM,
    getUsableRaceAF,
  ].map(fnc => fnc(nextValue, { entry }, { onlyClient: true }));

  if (asArray) {
    return clt;
  }

  return clt.map(val => (val ? 1 : 0)).join('');
};

export const getServerActableDst = (
  nextValue,
  { entry },
  { asArray = false, def = '00000' } = {},
) => {
  const srv = getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strActableDst']], def, fnc: isString },
  );

  if (asArray) {
    return Array.from(Array(5)).map((_, index) => !!srv[index]);
  }

  return srv;
};

export const getActableDstN = (
  nextValue,
  { entry },
  { n, onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerActableDst(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv) && isNotNullOrUndefined(srv[n - 1])) {
      return srv[n - 1];
    }
  }

  return !!getValue(
    nextValue,
    { entry },
    {
      fields: [['client', `nActableDst__${n}`]],
      def: false,
      fnc: isNotNullOrUndefined,
    },
  );
};

export const getActableDst = (
  nextValue,
  { entry },
  { asArray = false } = {},
) => {
  const srv = getServerActableDst(nextValue, { entry }, { asArray, def: null });

  if (!isNull(srv)) {
    return srv;
  }

  const clt = [1, 2, 3, 4, 5].map(n =>
    getActableDstN(nextValue, { entry }, { n, onlyClient: true }),
  );

  if (asArray) {
    return clt;
  }

  return clt.map(val => (val ? 1 : 0)).join('');
};

export const getNeedMastIndex = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nNeedMastIndex'], ['client', 'nNeedMastIndex']],
      def: -1,
      fnc: isInteger,
    },
  );

export const getServerFixWeapon = (
  nextValue,
  { entry },
  { asArray = false, def = '0000000000000000' } = {},
) => {
  const srv = getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strFixWeapon']], def, fnc: isString },
  );

  if (asArray) {
    return Array.from(Array(16)).map((_, index) => !!srv[index]);
  }

  return srv;
};

export const getFixWeaponN = (
  nextValue,
  { entry },
  { n, onlyClient = false } = {},
) => {
  if (!onlyClient) {
    const srv = getServerFixWeapon(
      nextValue,
      { entry },
      { def: null, asArray: true },
    );

    if (!isNull(srv) && isNotNullOrUndefined(srv[n - 1])) {
      return srv[n - 1];
    }
  }

  return !!getValue(
    nextValue,
    { entry },
    {
      fields: [['client', `nFixWeapon__${n}`]],
      def: false,
      fnc: isNotNullOrUndefined,
    },
  );
};

export const getFixWeapon = (
  nextValue,
  { entry },
  { asArray = false } = {},
) => {
  const srv = getServerFixWeapon(nextValue, { entry }, { asArray, def: null });

  if (!isNull(srv)) {
    return srv;
  }

  const clt = Array.from(Array(16))
    .map((_, index) => index + 1)
    .map(n => getFixWeaponN(nextValue, { entry }, { n, onlyClient: true }));

  if (asArray) {
    return clt;
  }

  return clt.map(val => (val ? 1 : 0)).join('');
};

export const getSpecialType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nSpecialType'], ['client', 'nSpecialType']],
      def: -1,
      fnc: isInteger,
    },
  );

export const getNeedSpecialType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nNeedSpecialType'], ['client', 'nNeedSpecialType']],
      def: -1,
      fnc: isInteger,
    },
  );

export const getActDelay = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'fActDelay'], ['client', 'fActDelay']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getCumulCounter = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nCumulCounter']], def: -1, fnc: isInteger },
  );

export const getNewEffCount = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nNewEffCount']], def: -1, fnc: isInteger },
  );

export const getEffectCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strEffectCode']], def: '', fnc: isString },
  );

export const getAttackable = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nAttackable']], def: 0, fnc: isInteger },
  );

export const getAttTypeN = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `nAttType__${n}`]], def: 0, fnc: isInteger },
  );

export const getAttConstantN = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `nAttConstant__${n}`]], def: 0, fnc: isInteger },
  );

export const getAttFormulaConstant = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'fAttFormulaConstant']], def: 0, fnc: isNumber },
  );

export const getAttNeedBt = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nAttNeedBt'], ['client', 'nAttNeedBt']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getBonusDistance = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nBonusDistance'], ['client', 'fBonusDistance']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getRangeEffectCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strRangeEffCode']], def: '', fnc: isString },
  );

export const getTempEffectType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nTempEffectType']], def: 0, fnc: isInteger },
  );

export const getTempParamCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nTempParamCode']], def: 0, fnc: isInteger },
  );

export const getTempValueN = (nextValue, { entry }, { n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `fTempValue__${n}`]], def: 0, fnc: isNumber },
  );

export const getContEffectType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nContEffectType']], def: -1, fnc: isInteger },
  );

export const getEffLimType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nEffLimType']], def: -1, fnc: isInteger },
  );

export const getEffLimType2 = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'nEffLimType2']], def: -1, fnc: isInteger },
  );
