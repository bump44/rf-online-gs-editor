import { isString, isInteger, isBoolean, isNumber } from 'lodash';

import { convNPCodeClientToServer } from '~/utils/converters';
import { getTypeNameByFinite } from '~/structs/item_types_utils';
import { STORE_BONE, STORE_MESH, STORE_ANI } from '~/structs/resource_types';
import { getValue, getListValue } from './nextValue';
import { getNextValues } from './nextValues';

import * as projectItem from './projectItem';
import * as projectResource from './projectResource';

export const getName = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [
        ['priorStrName'],
        ['client', 'strStoreNPCname'],
        ['server', 'strStoreNPCname'],
      ],
      def: '',
      fnc: isString,
    },
  );

export const getSdCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'strCode']],
      def: '',
      fnc: isString,
    },
  );

export const getBdCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'strBindingDummyName']],
      def: '',
      fnc: isString,
    },
  );

export const getMapCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'strStoreMAPcode']],
      def: '',
      fnc: isString,
    },
  );

export const getMapNameType = (nextValue, { entry, mapNameTypes }) => {
  const value = getMapCode(nextValue, { entry });
  return mapNameTypes.find(mapNameType => mapNameType.get('value') === value);
};

export const getModel = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['client', 'strModel']],
      def: '',
      fnc: isString,
    },
  );

export const getCode = (nextValue, { entry }) =>
  getServerCode(nextValue, { entry }) ||
  convNPCodeClientToServer(getClientCode(nextValue, { entry }));

export const getClientCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'strCode']], def: '', isString },
  );

export const getServerCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', 'strStoreNPCcode']], def: '', fnc: isString },
  );

export const getLastName = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', 'strStoreNPClastName']], def: '', fnc: isString },
  );

export const getTrade = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStoreTrade'], ['client', 'nStoreTrade']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getUseAngle = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['client', 'bSetNPCangle']],
      def: false,
      fnc: isBoolean,
    },
  );

export const getSize = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['client', 'fStoreNPCsize']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getAngle = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['client', 'fStoreNPCangle']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getMapSpts = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'mapSpts' });

export const getResources = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'resources' });

export const getResourceBoneIsDefined = (nextValue, { entry, nextValues }) =>
  getResources(nextValue, { entry }).some(
    resource =>
      projectResource.getType(getNextValues(nextValues, resource), {
        entry: resource,
      }) === STORE_BONE,
  );

export const getResourceMeshIsDefined = (nextValue, { entry, nextValues }) =>
  getResources(nextValue, { entry }).some(
    resource =>
      projectResource.getType(getNextValues(nextValues, resource), {
        entry: resource,
      }) === STORE_MESH,
  );

export const getResourceAniIsDefined = (nextValue, { entry, nextValues }) =>
  getResources(nextValue, { entry }).some(
    resource =>
      projectResource.getType(getNextValues(nextValues, resource), {
        entry: resource,
      }) === STORE_ANI,
  );

export const getItems = (nextValue, { entry }) =>
  getListValue(nextValue, { entry }, { field: 'items' });

export const getItemListClientType = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', `nItemListType__${n}_1`]], def: 0, fnc: isInteger },
  );

export const getLimItemListClientType = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', `nLimItemType__${n}_1`]], def: 0, fnc: isInteger },
  );

export const getItemListClientCode = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', `strItemList__${n}_2`]], def: '', fnc: isString },
  );

export const getLimItemListClientCode = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', `strLimItemCode__${n}_2`]], def: '', fnc: isString },
  );

export const getLimItemListClientCount = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['client', `nLimMaxCount__${n}_3`]], def: 0, fnc: isInteger },
  );

export const getItemListClient = (
  nextValue,
  { entry, nextValues },
  { n = 1 },
) => {
  const finite = getItemListClientType(nextValue, { entry }, { n });
  const typeName = getTypeNameByFinite(finite);
  const code = getItemListClientCode(nextValue, { entry }, { n });

  if (!typeName || !code) {
    return undefined;
  }

  return getItemByClientCode(
    nextValue,
    { entry, nextValues },
    { code, typeName },
  );
};

export const getLimItemListClient = (
  nextValue,
  { entry, nextValues },
  { n = 1 },
) => {
  const finite = getLimItemListClientType(nextValue, { entry }, { n });
  const typeName = getTypeNameByFinite(finite);
  const code = getLimItemListClientCode(nextValue, { entry }, { n });

  if (!typeName || !code) {
    return undefined;
  }

  return getItemByClientCode(
    nextValue,
    { entry, nextValues },
    { code, typeName },
  );
};

export const getItemByClientCode = (
  nextValue,
  { entry, nextValues },
  { code, typeName } = {},
) =>
  getItems(nextValue, { entry }).find(
    item =>
      projectItem.getClientCode(getNextValues(nextValues, item), {
        entry: item,
      }) === code &&
      typeName ===
        projectItem.getType(getNextValues(nextValues, item), {
          entry: item,
        }),
  );

export const getItemListServer = (
  nextValue,
  { entry, nextValues },
  { n = 1 },
) => {
  const code = getItemListServerCode(nextValue, { entry }, { n });
  if (!code) {
    return undefined;
  }
  return getItemByServerCode(nextValue, { entry, nextValues }, { code });
};

export const getLimItemListServer = (
  nextValue,
  { entry, nextValues },
  { n = 1 },
) => {
  const code = getLimItemListServerCode(nextValue, { entry }, { n });
  if (!code) {
    return undefined;
  }
  return getItemByServerCode(nextValue, { entry, nextValues }, { code });
};

export const getItemByServerCode = (
  nextValue,
  { entry, nextValues },
  { code } = {},
) =>
  getItems(nextValue, { entry }).find(
    item =>
      projectItem.getServerCode(getNextValues(nextValues, item), {
        entry: item,
      }) === code,
  );

export const getItemListServerCode = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `strItemCode__${n}`]], def: '', fnc: isString },
  );

export const getLimItemListServerCode = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `strLimItemCode__${n}_1`]], def: '', fnc: isString },
  );

export const getLimItemListServerCount = (nextValue, { entry }, { n = 1 }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['server', `nLimMaxCount__${n}_2`]], def: 0, fnc: isInteger },
  );

export const getItemList = (...props) => ({
  client: getItemListClient(...props),
  server: getItemListServer(...props),
  clientType: getItemListClientType(...props),
  clientCode: getItemListClientCode(...props),
  serverCode: getItemListServerCode(...props),
  n: props[2].n,
});

export const getLimItemList = (...props) => ({
  client: getLimItemListClient(...props),
  server: getLimItemListServer(...props),
  clientType: getLimItemListClientType(...props),
  clientCode: getLimItemListClientCode(...props),
  clientCount: getLimItemListClientCount(...props),
  serverCode: getLimItemListServerCode(...props),
  serverCount: getLimItemListServerCount(...props),
  n: props[2].n,
});

export const getItemsList = (nextValue, { entry, nextValues }) =>
  Array.from(Array(200)).map((_, index) =>
    getItemList(nextValue, { entry, nextValues }, { n: index + 1 }),
  );

export const getLimItemsList = (nextValue, { entry, nextValues }) =>
  Array.from(Array(16)).map((_, index) =>
    getLimItemList(nextValue, { entry, nextValues }, { n: index + 1 }),
  );

export const getItemsListCount = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nStoreListCount'], ['client', 'nStoreListCount']],
      def: 0,
      fnc: isNumber,
    },
  );

export const getLimItemsListCount = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', 'nLimitListCount'], ['client', 'nLimitLISTcount']],
      def: 0,
      fnc: isInteger,
    },
  );

export const getId = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['id']], def: undefined, fnc: isString },
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

export const getIndex = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nIndex']], def: undefined, fnc: isNumber },
  );

export const getButtonValue = (nextValue, { entry }, { n = 1 } = {}) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['server', `nNpcClass__${n}`], ['client', `nNpcClass__${n}`]],
      def: 0,
      fnc: isNumber,
    },
  );

export const getButtonType = (
  nextValue,
  { entry, buttonTypes },
  { n = 1 } = {},
) => {
  const value = getButtonValue(nextValue, { entry }, { n });
  return buttonTypes.find(buttonType => buttonType.get('value') === value);
};

export const getRace = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    {
      fields: [['npcharacter', 'nRace'], ['client', 'nRace']],
      def: -1,
      fnc: isInteger,
    },
  );
