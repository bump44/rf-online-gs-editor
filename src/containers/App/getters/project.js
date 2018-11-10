import { getListValue } from './nextValue';

/**
 * Return the refs data
 * @param {Object} nextValue next item values
 * @param {Object} props entry: the first thing we got from the server
 *
 * @returns String
 */
export const getRefs = (nextValue, { entry }) => ({
  moneyTypes: getRefMoneyTypes(nextValue, { entry }),
  itemGradeTypes: getRefItemGradeTypes(nextValue, { entry }),
  weaponTypes: getRefWeaponTypes(nextValue, { entry }),
  buttonTypes: getRefButtonTypes(nextValue, { entry }),
  effectTypes: getRefEffectTypes(nextValue, { entry }),
  expertTypes: getRefExpertTypes(nextValue, { entry }),
  mapNameTypes: getRefMapNameTypes(nextValue, { entry }),
});

export const getRef = (nextValue, { entry }, fieldName) =>
  getListValue(nextValue, { entry }, { field: [fieldName, 'items'] });

export const getRefMapNameTypes = (...args) => getRef(...args, 'mapNameTypes');
export const getRefEffectTypes = (...args) => getRef(...args, 'effectTypes');
export const getRefExpertTypes = (...args) => getRef(...args, 'expertTypes');
export const getRefMoneyTypes = (...args) => getRef(...args, 'moneyTypes');
export const getRefItemGradeTypes = (...args) =>
  getRef(...args, 'itemGradeTypes');
export const getRefWeaponTypes = (...args) => getRef(...args, 'weaponTypes');
export const getRefButtonTypes = (...args) => getRef(...args, 'buttonTypes');
