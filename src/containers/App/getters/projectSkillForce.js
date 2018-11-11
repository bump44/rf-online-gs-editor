import { isBoolean, isInteger, isString } from 'lodash';

import { getValue } from './nextValue';

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
