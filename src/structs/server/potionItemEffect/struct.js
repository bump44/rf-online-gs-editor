import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: Number, name: 'nClass', len: 32 } },
  { child: { type: Number, name: 'nIconIDX', len: 32 } },
  { child: { type: Number, name: 'nMastIndex', len: 32 } },
  { child: { type: String, name: 'strMastKorName', len: 64 } },
  { child: { type: String, name: 'strMastEngName', len: 64 } },
  { child: { type: String, name: 'strKorName', len: 64 } },
  { child: { type: String, name: 'strEngName', len: 64 } },
  { child: { type: Number, name: 'nLv', len: 32 } },
  { child: { type: Boolean, name: 'bActivate', len: 32 } },
  { child: { type: Boolean, name: 'bEnable', len: 32 } },
  { child: { type: String, name: 'strUsableRace', len: 64 } },
  { child: { type: String, name: 'strActableDst', len: 64 } },
  { child: { type: String, name: 'strGradeLimit', len: 64 } },
  { child: { type: Number, name: 'nNeedMastIndex', len: 32 } },
  { child: { type: String, name: 'strFixWeapon', len: 64 } },
  { child: { type: Boolean, name: 'bFixshield', len: 32 } },
  { child: { type: Number, name: 'nSpecialType', len: 32 } },
  { child: { type: Number, name: 'nNeedSpecialType', len: 32 } },
  { child: { type: Number, name: 'nNeedHP', len: 32 } },
  { child: { type: Number, name: 'nNeedFP', len: 32 } },
  { child: { type: Number, name: 'nNeedSP', len: 32 } },

  // _consume_item_list
  {
    child: [
      {
        type: String,
        name: 'itmNeedItemCode',
        len: 8,
      },
      { type: Number, name: 'nNeedItemCount', len: 32 },
    ],
    repeat: 3,
  },

  { child: { type: Number, name: 'fActDelay', len: 32, as: 'float' } },
  { child: { type: Boolean, name: 'bCumulType', len: 32 } },
  { child: { type: Number, name: 'nCumulCounter', len: 32 } },
  { child: { type: Number, name: 'nNewEffCount', len: 32 } },
  { child: { type: String, name: 'strEffectCode', len: 64 } },
  { child: { type: Number, name: 'nAttackable', len: 32 } },
  { child: { type: Number, name: 'nAttType', len: 32 }, repeat: 7 },
  { child: { type: Number, name: 'nAttConstant', len: 32 }, repeat: 7 },
  {
    child: { type: Number, name: 'fAttFormulaConstant', len: 32, as: 'float' },
  },
  { child: { type: Number, name: 'nAttNeedBt', len: 32 } },
  { child: { type: Number, name: 'nBonusDistance', len: 32 } },
  { child: { type: String, name: 'strRangeEffCode', len: 64 } },
  { child: { type: Number, name: 'nTempEffectType', len: 32 } },
  { child: { type: Number, name: 'nTempParamCode', len: 32 } },
  {
    child: { type: Number, name: 'fTempValue', len: 32, as: 'float' },
    repeat: 7,
  },
  { child: { type: Number, name: 'nContEffectType', len: 32 } },
  { child: { type: Number, name: 'nEffLimType', len: 32 } },
  { child: { type: Number, name: 'nEffLimType2', len: 32 } },
  { child: { type: Number, name: 'nContAreaType', len: 32 } },

  // _cont_param_list
  {
    child: [
      { type: Number, name: 'nContParamCode', len: 32 },
      { type: Number, name: 'nContParamIndex', len: 32 },
      {
        child: { type: Number, name: 'fContValue', len: 32, as: 'float' },
        repeat: 7,
      },
    ],
    repeat: 5,
  },

  { child: { type: Number, name: 'nContEffectSec', len: 32 }, repeat: 7 },
  { child: { type: Number, name: 'nEtc', len: 32 } },
  { child: { type: Number, name: 'f1s2speed', len: 32, as: 'float' } },
  { child: { type: Number, name: 'f1s2distance', len: 32, as: 'float' } },
  { child: { type: Number, name: 'f2s3speed', len: 32, as: 'float' } },
  { child: { type: Number, name: 'f2s3distance', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nEffectClass', len: 32 } },
]);
