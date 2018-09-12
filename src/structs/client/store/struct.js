import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nRace', len: 8 } },
  { child: { type: String, name: 'strStoreNPCname', len: 32 } },
  { child: { type: String, name: 'strStoreNPClastName', len: 32 } },
  { child: { type: String, name: 'strModel', len: 32 } },
  { child: { type: Number, name: 'nStoreTrade', len: 8 } },
  { child: { type: Number, name: 'nUnkInt16_1', len: 16 } },
  { child: { type: Number, name: 'fStoreNPCangle', len: 32, as: 'float' } },
  { child: { type: Boolean, name: 'bSetNPCangle', len: 32 } },
  { child: { type: Number, name: 'fStoreNPCsize', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nStoreLISTcount', len: 32 } },

  // listItems
  {
    child: [
      { type: Number, name: 'nItemListType', len: 32 },
      { type: String, name: 'strItemList', len: 32, as: 'hex' },
    ],
    repeat: 200,
  },

  { child: { type: Number, name: 'nNpcClass', len: 8 }, repeat: 10 },
  { child: { type: String, len: 32, as: 'hex', name: 'strUnkX32' } },
  { child: { type: Number, len: 16, name: 'nUnkInt16_2' } },
  { child: { type: Number, len: 32, name: 'nPriceSet' } },
  { child: { type: String, len: 32, name: 'strItemUpCode', as: 'hex' } },
  { child: { type: Number, len: 32, name: 'nLimitLISTcount' } },

  // limitListItems
  {
    child: [
      { type: Number, name: 'nLimItemType', len: 32 },
      { type: String, name: 'strLimItemCode', len: 32, as: 'hex' },
      { type: Number, name: 'nLimMaxCount', len: 32 },
    ],
    repeat: 16,
  },
]);
