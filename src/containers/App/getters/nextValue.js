import { isNullOrUndefined } from 'util';
import { IMMUTABLE_MAP } from '../constants';

export const getValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { fields = [], def = undefined, fnc = isNullOrUndefined } = {},
) => {
  const fldsl = fields.find(flds => fnc(nextValue.getIn(flds)));
  if (fldsl) {
    return nextValue.getIn(fldsl);
  }

  const fldsr = fields.find(flds => fnc(entry.getIn(flds)));
  if (fldsr) {
    return entry.getIn(fldsr);
  }

  return def;
};
