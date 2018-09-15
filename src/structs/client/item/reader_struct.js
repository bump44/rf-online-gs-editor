import {
  FACE,
  UPPER,
  LOWER,
  GAUNTLET,
  SHOE,
  HELMET,
  WEAPON,
} from '../../item_types';

import defaultHeader from './default_header';
import toolStruct from './tool_struct';
import armorStruct from './armor_struct';
import weaponStruct from './weapon_struct';

const readerStruct = [
  {
    type: FACE,
    header: defaultHeader,
    block: toolStruct,
  },
  ...[UPPER, LOWER, GAUNTLET, SHOE, HELMET].map(type => ({
    type,
    header: defaultHeader,
    block: armorStruct,
  })),
  {
    type: WEAPON,
    header: defaultHeader,
    block: weaponStruct,
  },
];

export default readerStruct;
