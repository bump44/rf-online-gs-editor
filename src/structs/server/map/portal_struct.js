import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: String, name: 'strLinkMapCode', len: 64 } },
  { child: { type: String, name: 'strLinkPortalCode', len: 64 } },
  { child: { type: String, name: 'strMenu', len: 64 } },
  { child: { type: Boolean, name: 'bNeedConCheck', len: 32 } },
  { child: { type: Number, name: 'nNeedChrLevel', len: 32 } },
  { child: { type: Number, name: 'nUpLevelLim', len: 32 } },
  {
    child: [
      { type: String, name: 'strNeedItemCode', len: 8 },
      { type: Number, name: 'nNeedItemCount', len: 32 },
    ],
    repeat: 3,
  },
  { child: { type: Number, name: 'nKind', len: 32 } },
  { child: { type: String, name: 'strUseRace', len: 64 } },
]);
