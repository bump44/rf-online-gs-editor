import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: Number, name: 'nNewItemType', len: 32 } },
  { child: { type: Number, name: 'nNewItemIndex', len: 32 } },
  { child: { type: String, name: 'strNewItemCode', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nLink', len: 32 } },
  { child: { type: Number, name: 'nPosInWindow', len: 32 } },
  { child: { type: String, name: 'strCivil1', len: 32, as: 'hex' } },
  { child: { type: String, name: 'strCivil2', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nUnkInt8_1', len: 8 } },
  { child: { type: Number, name: 'nNumMaterials', len: 8 } },
  { child: { type: Number, name: 'nMaterialType', len: 8 }, repeat: 5 },
  { child: { type: Number, name: 'nUnkInt8_2', len: 8 } },
  { child: { type: Number, name: 'nMaterialIndex', len: 32 }, repeat: 5 },
  {
    child: { type: String, name: 'strMaterialCode', len: 32, as: 'hex' },
    repeat: 5,
  },
  { child: { type: Number, name: 'nMaterialCount', len: 32 }, repeat: 5 },
  { child: { type: Number, name: 'nUnkInt32_1', len: 32 } },
]);
