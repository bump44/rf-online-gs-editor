import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: String, name: 'strBindingDummyName', len: 64 } },
  { child: { type: String, name: 'strStoreNPCcode', len: 64 } },
  { child: { type: String, name: 'strStoreNPCname', len: 64 } },
  { child: { type: String, name: 'strStoreMAPcode', len: 64 } },
  { child: { type: Number, name: 'nStoreTrade', len: 32 } },
  { child: { type: Boolean, name: 'bSetNPCangle', len: 32 } },
  { child: { type: Number, name: 'nStoreNPCangle', len: 32 } },
  { child: { type: Number, name: 'nNpcClass', len: 32 }, repeat: 10 },
  { child: { type: Number, name: 'nStoreListCount', len: 32 } },
  { child: { type: Number, name: 'nLimitListCount', len: 32 } },
  { child: { type: Number, name: 'nLimitItemInitTime', len: 32 } },
  { child: { type: Number, name: 'nPriceSet', len: 32 } },
  { child: { type: Number, name: 'nItemUpCode', len: 32 } },
  {
    child: { type: String, name: 'strItemCode', len: 64 },
    repeat: 200,
  },
  {
    child: [
      { type: String, name: 'strLimItemCode', len: 64 },
      { type: Number, name: 'nLimMaxCount', len: 32 },
    ],
    repeat: 16,
  },
]);
