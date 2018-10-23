import { isString, isInteger, isBoolean, isNumber } from 'lodash';

import { getValue } from './nextValue';
import { IMMUTABLE_MAP } from '../constants';

export const getAnchor = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['strAnchor']],
      def: '',
      fnc: isString,
    },
  );

export const getA1 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a1']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getA2 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a2']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getA3 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a3']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getA4 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a4']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getA5 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a5']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getA6 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['a6']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getExcludeNodeTm = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['bExcludeNodeTm']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getB1 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['b1']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getB2 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['b2']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getB3 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['b3']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getB4 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['b4']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getC1 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['c1']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getC2 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['c2']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getC3 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['c3']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getC4 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['c4']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getD1 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['d1']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getD2 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['d2']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getD3 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['d3']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getD4 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['d4']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getE1 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['e1']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getE2 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['e2']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getE3 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['e3']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getE4 = (nextValue = IMMUTABLE_MAP, { entry = IMMUTABLE_MAP }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['e4']],
      def: 0,
      fnc: isNumber,
    },
  );
