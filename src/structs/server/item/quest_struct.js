import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: Number, name: 'nIconIDX', len: 32 } },
  { child: { type: String, name: 'strName', len: 64 } },
  { child: { type: String, name: 'strTooltipIndex', len: 64 } },
]);
