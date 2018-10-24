import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  {
    child: [
      { type: String, len: 8, name: 'strItemCode' },
      { type: Number, len: 32, name: 'nItemCount' },
      { type: Number, len: 32, name: 'nItemProb' },
    ],
    repeat: 61,
  },
]);
