import Struct from '../../../classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 64 } },
  { child: { type: String, name: 'strModel', len: 64 } },
  { child: { type: Number, name: 'nIconIDX', len: 32 } },
  { child: { type: String, name: 'strName', len: 64 } },
  { child: { type: Number, name: 'nFixPart', len: 32 } },
  { child: { type: String, name: 'strDefFrame', len: 64 } },
  { child: { type: Number, name: 'nWPType', len: 32 } },
  { child: { type: Number, name: 'nEffectGroup', len: 32 } },
  { child: { type: Number, name: 'nNeedBt', len: 32 } },
  { child: { type: Boolean, name: 'bAbr', len: 32 } },
  { child: { type: Number, name: 'nDurUnit', len: 32 } },
  { child: { type: Number, name: 'nLevelLim', len: 32 } },
  { child: { type: Number, name: 'nUpLevelLim', len: 32 } },
  { child: { type: Number, name: 'nExpertID1', len: 32 } },
  { child: { type: Number, name: 'nExpertLim1', len: 32 } },
  { child: { type: Number, name: 'nExpertID2', len: 32 } },
  { child: { type: Number, name: 'nExpertLim2', len: 32 } },
  { child: { type: Number, name: 'fAttGap', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nAttackDP', len: 32 } },
  { child: { type: Number, name: 'fAttackRange', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nAttackDel', len: 32 } },
  { child: { type: Number, name: 'fMoveSpdRev', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nGAMinAF', len: 32 } },
  { child: { type: Number, name: 'nGAMaxAF', len: 32 } },
  { child: { type: Number, name: 'nAttMastery', len: 32 } },
  { child: { type: Number, name: 'nGAMinSelProb', len: 32 } },
  { child: { type: Number, name: 'nGAMaxSelProb', len: 32 } },
  { child: { type: Number, name: 'nDefFc', len: 32 } },
  { child: { type: Number, name: 'nDefMastery', len: 32 } },
  { child: { type: Number, name: 'nProperty', len: 32 } },
  { child: { type: Number, name: 'nFireTol', len: 32 } },
  { child: { type: Number, name: 'nWaterTol', len: 32 } },
  { child: { type: Number, name: 'nSoilTol', len: 32 } },
  { child: { type: Number, name: 'nWindTol', len: 32 } },
  { child: { type: Number, name: 'nMoney', len: 32 } },
  { child: { type: Number, name: 'nStdPrice', len: 32 } },
  { child: { type: Number, name: 'nStdPoint', len: 32 } },
  { child: { type: Number, name: 'nRepPrice', len: 32 } },
  { child: { type: Number, name: 'nDesrepPrice', len: 32 } },
  { child: { type: Number, name: 'nBstCha', len: 32 } },
  { child: { type: Number, name: 'fBstSpd', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nBackSlt', len: 32 } },
  { child: { type: Number, name: 'nEffCode__1', len: 32 } },
  { child: { type: Number, name: 'fEffUnit__1', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nEffCode__2', len: 32 } },
  { child: { type: Number, name: 'fEffUnit__2', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nEffCode__3', len: 32 } },
  { child: { type: Number, name: 'fEffUnit__3', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nEffCode__4', len: 32 } },
  { child: { type: Number, name: 'fEffUnit__4', len: 32, as: 'float' } },
  { child: { type: String, name: 'strTooltipIndex', len: 64 } },
  { child: { type: Number, name: 'nAttEffType', len: 32 } },
  { child: { type: Number, name: 'nDefEffType', len: 32 } },
]);