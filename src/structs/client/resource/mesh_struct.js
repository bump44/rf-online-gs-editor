import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: String, name: 'strCode', len: 32, as: 'hex' } },
  { child: { type: String, name: 'strCode2', len: 32, as: 'hex' } },
  { child: { type: String, name: 'strPath', len: 128 } },
  { child: { type: String, name: 'strFileName', len: 64 } },
  { child: { type: String, name: 'strTexturePath', len: 128 } },
]);
