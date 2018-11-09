import { isBoolean, isInteger, isString } from 'lodash';

import { getValue } from './nextValue';

export const getActivate = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['bActivate']], def: false, fnc: isBoolean },
  );

export const getCumulType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['bCumulType']], def: false, fnc: isBoolean },
  );

export const getEnable = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['bEnable']], def: false, fnc: isBoolean },
  );

export const getFixshield = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['bFixshield']], def: false, fnc: isBoolean },
  );

export const getNeedHP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nNeedHP']], def: 0, fnc: isInteger },
  );

export const getNeedFP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nNeedFP']], def: 0, fnc: isInteger },
  );

export const getNeedSP = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nNeedSP']], def: 0, fnc: isInteger },
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

export const getCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strCode']], def: '', fnc: isString },
  );
