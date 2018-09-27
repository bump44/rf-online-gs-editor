import { isNullOrUndefined } from 'util';

export const getName = (nextValues, { item }) => {
  const nextValue = nextValues && nextValues.get('priorStrName');

  const currValue = item.getIn(
    [
      ['priorStrName'],
      ['client', 'strStoreNPCname'],
      ['server', 'strStoreNPCname'],
    ].find(fieldSets => !isNullOrUndefined(item.getIn(fieldSets))) ||
      'priorStrName',
    '',
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getLastName = (nextValues, { item }) => {
  const nextValue =
    nextValues && nextValues.getIn(['client', 'strStoreNPClastName']);

  const currValue = item.getIn(
    [['client', 'strStoreNPClastName']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['client', 'strStoreNPClastName'],
    '',
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getTrade = (nextValues, { item }) => {
  const nextValue = nextValues && nextValues.getIn(['client', 'nStoreTrade']);

  const currValue = item.getIn(
    [['server', 'nStoreTrade'], ['client', 'nStoreTrade']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['server', 'nStoreTrade'],
    0,
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getUseAngle = (nextValues, { item }) => {
  const nextValue = nextValues && nextValues.getIn(['client', 'bSetNPCangle']);

  const currValue = item.getIn(
    [['client', 'bSetNPCangle']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['client', 'bSetNPCangle'],
    false,
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getSize = (nextValues, { item }) => {
  const nextValue = nextValues && nextValues.getIn(['client', 'fStoreNPCsize']);

  const currValue = item.getIn(
    [['client', 'fStoreNPCsize']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['client', 'fStoreNPCsize'],
    1,
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getAngle = (nextValues, { item }) => {
  const nextValue =
    nextValues && nextValues.getIn(['client', 'fStoreNPCangle']);

  const currValue = item.getIn(
    [['client', 'fStoreNPCangle']].find(
      fieldSets => !isNullOrUndefined(item.getIn(fieldSets)),
    ) || ['client', 'fStoreNPCangle'],
    0,
  );

  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getItemListClientType = (nextValues, { item }, { n = 1 }) => {
  const nextValue =
    nextValues && nextValues.getIn(['client', `nItemListType__${n}_1`]);
  const currValue = item.getIn(['client', `nItemListType__${n}_1`]);
  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getItemListClientCode = (nextValues, { item }, { n = 1 }) => {
  const nextValue =
    nextValues && nextValues.getIn(['client', `strItemList__${n}_2`]);
  const currValue = item.getIn(['client', `strItemList__${n}_2`], '');
  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getItemListServerCode = (nextValues, { item }, { n = 1 }) => {
  const nextValue =
    nextValues && nextValues.getIn(['server', `strItemCode__${n}`]);
  const currValue = item.getIn(['server', `strItemCode__${n}`], '');
  return !isNullOrUndefined(nextValue) ? nextValue : currValue;
};

export const getItemList = (...props) => ({
  clientType: getItemListClientType(...props),
  clientCode: getItemListClientCode(...props),
  serverCode: getItemListServerCode(...props),
  n: props[2].n,
});

export const getItemsList = (nextValues, { item }) =>
  Array.from(Array(200)).map((_, index) =>
    getItemList(nextValues, { item }, { n: index + 1 }),
  );
