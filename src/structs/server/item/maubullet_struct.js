import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: String, name: 'strModel', len: 64 } },
  { child: { type: Number, name: 'nIconIDX', len: 32 } },
  { child: { type: String, name: 'strName', len: 64 } },
  { child: { type: Number, name: 'nWPType', len: 32 } },
  { child: { type: Boolean, name: 'bAbr', len: 32 } },
  { child: { type: Number, name: 'nDurUnit', len: 32 } },
  { child: { type: Number, name: 'nMoney', len: 32 } },
  { child: { type: Number, name: 'nStdPrice', len: 32 } },
  { child: { type: Number, name: 'nStdPoint', len: 32 } },
  { child: { type: Number, name: 'fGAAF', len: 32, as: 'float' } },
  { child: { type: String, name: 'strEffectIndex', len: 64 } },
  { child: { type: String, name: 'strTooltipIndex', len: 64 } },
]);
