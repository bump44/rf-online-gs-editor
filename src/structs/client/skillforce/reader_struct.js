import defaultHeader from './default_header';
import spellStruct from './spell_struct';
import skillStruct from './skill_struct';

import {
  BULLET,
  POTION,
  SPELL,
  SKILL,
  CLASS_SKILL,
} from '~/structs/skillforce_types';

const readerStruct = [
  ...[
    { type: SPELL, block: spellStruct },
    { type: SKILL, block: skillStruct },
    { type: CLASS_SKILL, block: skillStruct },
    { type: BULLET, block: skillStruct },
    { type: POTION, block: skillStruct },
  ].map(({ type, block }) => ({
    header: defaultHeader,
    block,
    type,
  })),
];

export default readerStruct;
