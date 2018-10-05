import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nLength', len: 32 } },
  {
    child: {
      type: String,
      name: 'strValue',
      len: (values = {}) =>
        values.nLength !== undefined &&
        values.nLength >= 0 &&
        values.nLength < 1200
          ? values.nLength
          : 0,
    },
  },
]);
