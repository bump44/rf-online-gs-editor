import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../constants';

/**
 * Return the refs data
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getRefs = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) => ({
  moneyTypes: getRefMoneyTypes(nextValue, { entry }),
  itemGrades: getRefItemGrades(nextValue, { entry }),
  weaponTypes: getRefWeaponTypes(nextValue, { entry }),
  buttonTypes: getRefButtonTypes(nextValue, { entry }),
});

export const getRefMoneyTypes = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['moneyTypes', 'items'],
    entry.getIn(['moneyTypes', 'items'], IMMUTABLE_LIST),
  );

export const getRefItemGrades = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['itemGrades', 'items'],
    entry.getIn(['itemGrades', 'items'], IMMUTABLE_LIST),
  );

export const getRefWeaponTypes = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['weaponTypes', 'items'],
    entry.getIn(['weaponTypes', 'items'], IMMUTABLE_LIST),
  );

export const getRefButtonTypes = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
) =>
  nextValue.getIn(
    ['buttonTypes', 'items'],
    entry.getIn(['buttonTypes', 'items'], IMMUTABLE_LIST),
  );
