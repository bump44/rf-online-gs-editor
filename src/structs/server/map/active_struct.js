import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: Number, name: 'nRegenTime', len: 32 } },
  { child: { type: Number, name: 'nRegenLimNum', len: 32 } },
  { child: { type: Number, name: 'nRegenProp', len: 32 } },
  { child: { type: Number, name: 'nRegenMinNum', len: 32 } },
  { child: { type: Number, name: 'nStdKill', len: 32 } },
  { child: { type: Number, name: 'nRegenMaxNum', len: 32 } },
]);
