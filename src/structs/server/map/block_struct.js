import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: Number, name: 'nDummyNum', len: 32 } },
  {
    child: [
      { type: String, name: 'strDummyCode', len: 64 },
      { type: Number, name: 'nSelectProp', len: 32 },
    ],
    repeat: 20,
  },
  { child: { type: Number, name: 'nMin', len: 32 } },
  { child: { type: Number, name: 'nMob', len: 32 } },
  { child: { type: Number, name: 'nMax', len: 32 } },
]);
