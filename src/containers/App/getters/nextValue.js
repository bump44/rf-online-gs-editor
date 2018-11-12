import { isNullOrUndefined } from 'util';

import { IMMUTABLE_MAP, IMMUTABLE_LIST } from '../constants';

export function isNotNullOrUndefined(value) {
  return !isNullOrUndefined(value);
}

export const getValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { fields = [], def = undefined, fnc = isNotNullOrUndefined } = {},
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

export const getMapValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { field },
) => {
  const next = nextValue.get(field);
  const curr = entry.get(field);

  if (!curr && !next) {
    return undefined;
  }

  if (next && curr) {
    return curr.mergeDeep(next);
  }

  if (curr) {
    return curr;
  }

  return next;
};

export const getListValue = (
  nextValue = IMMUTABLE_MAP,
  { entry = IMMUTABLE_MAP },
  { field },
) =>
  (
    entry[field instanceof Array ? 'getIn' : 'get'](
      field,
      IMMUTABLE_LIST,
    ).concat(
      nextValue[field instanceof Array ? 'getIn' : 'get'](
        field,
        IMMUTABLE_LIST,
      ),
    ) || IMMUTABLE_LIST
  )
    .groupBy(x => x.get('id'))
    .map(xs => {
      let next = IMMUTABLE_MAP;
      // eslint-disable-next-line
      xs.forEach(xss => (next = next.mergeDeep(xss)));
      return next;
    })
    .toList();
