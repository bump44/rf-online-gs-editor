import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: Boolean, name: 'bExist', len: 32 } },
  { child: { type: String, name: 'strModel', len: 64 } },
  { child: { type: String, name: 'strName', len: 64 } },
  { child: { type: Number, name: 'nKindClt', len: 32 } },
  { child: { type: Number, name: 'nFixPart', len: 32 } },
  { child: { type: String, name: 'strCivil', len: 64 } },
  { child: { type: Number, name: 'nDefEffType', len: 32 } },
]);
