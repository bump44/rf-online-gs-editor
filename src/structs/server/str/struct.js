import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: String, name: 'strKo', len: 64 } },
  { child: { type: String, name: 'strBr', len: 64 } },
  { child: { type: String, name: 'strCh', len: 64 } },
  { child: { type: String, name: 'strEn', len: 64 } },
  { child: { type: String, name: 'strIn', len: 64 } },
  { child: { type: String, name: 'strJa', len: 64 } },
  { child: { type: String, name: 'strPh', len: 64 } },
  { child: { type: String, name: 'strRu', len: 64 } },
  { child: { type: String, name: 'strTa', len: 64 } },
  { child: { type: String, name: 'strVi', len: 64 } },
  { child: { type: String, name: 'strGlobal', len: 64 } },
]);
