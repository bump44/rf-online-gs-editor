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
  BULLET,
  MAKETOOL,
  POTION,
  BATTERY,
  ORE,
} from '../../item_types';

import defaultHeader from './default_header';
import toolStruct from './tool_struct';
import armorStruct from './armor_struct';
import weaponStruct from './weapon_struct';
import cloakStruct from './cloak_struct';
import jewelryStruct from './jewelry_struct';
import bulletStruct from './bullet_struct';
import potionStruct from './potion_struct';
import batteryStruct from './battery_struct';
import oreStruct from './ore_struct';

const readerStruct = [
  {
    type: FACE,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  ...[UPPER, LOWER, GAUNTLET, SHOE, HELMET].map(type => ({
    type,
    header: defaultHeader,
    block: armorStruct,
    skipBlocks: true,
  })),
  {
    type: WEAPON,
    header: defaultHeader,
    block: weaponStruct,
    skipBlocks: true,
  },
  {
    type: SHIELD,
    header: defaultHeader,
    block: armorStruct,
    skipBlocks: true,
  },
  {
    type: CLOAK,
    header: defaultHeader,
    block: cloakStruct,
    skipBlocks: true,
  },
  ...[RING, AMULET].map(type => ({
    type,
    header: defaultHeader,
    block: jewelryStruct,
    skipBlocks: true,
  })),
  {
    type: BULLET,
    header: defaultHeader,
    block: bulletStruct,
  },
  {
    type: MAKETOOL,
    header: defaultHeader,
    block: toolStruct,
  },
  {
    type: POTION,
    header: defaultHeader,
    block: potionStruct,
  },
  {
    type: BATTERY,
    header: defaultHeader,
    block: batteryStruct,
  },
  {
    type: ORE,
    header: defaultHeader,
    block: oreStruct,
  },
];

export default readerStruct;
