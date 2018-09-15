import {
  FACE,
  UPPER,
  LOWER,
  GAUNTLET,
  SHOE,
  HELMET,
  WEAPON,
  SHIELD,
  CLOAK,
  RING,
  AMULET,
} from '../../item_types';

import defaultHeader from './default_header';
import toolStruct from './tool_struct';
import armorStruct from './armor_struct';
import weaponStruct from './weapon_struct';
import cloakStruct from './cloak_struct';
import jewelryStruct from './jewelry_struct';

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
  {
    type: SHIELD,
    header: defaultHeader,
    block: armorStruct,
  },
  {
    type: CLOAK,
    header: defaultHeader,
    block: cloakStruct,
  },
  ...[RING, AMULET].map(type => ({
    type,
    header: defaultHeader,
    block: jewelryStruct,
  })),
];

export default readerStruct;
