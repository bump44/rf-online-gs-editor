import { isNullOrUndefined } from 'util';

export const getName = (nextValues, { item }) => {
  const nextValue = nextValues && nextValues.get('priorStrName');

  const currValue = item.getIn(
    [
      ['priorStrName'],
      ['clientNd', 'strName'],
      ['client', 'strStoreNPCname'],
      ['serverStr', 'strNameEN'],
      ['serverStr', 'strNameGLOBAL'],
      ['server', 'strName'],
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
