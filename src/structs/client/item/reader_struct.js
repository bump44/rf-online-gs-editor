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
  RESOURCE,
  BAG,
  FORCE,
  UNITKEY,
  BOOTY,
  MAP,
  TOWN,
  DUNGEONKEY,
  ANIMUS,
  TOWER,
  TRAP,
  SIEGEKIT,
  TICKET,
  QUEST,
  RECOVERY,
  BOX,
  FIRECRACKER,
  CASHMINING,
  RADAR,
  PAGER,
  COUPON,
  MAUHEAD,
  MAUUPPER,
  MAULOWER,
  MAUARM,
  MAUSHOULDER,
  MAUBACK,
  MAUBULLET,
  MAKEDATA,
  COMBINEDATA,
  UNK3,
} from '../../item_types';

import defaultHeader from './default_header';
import unk3Header from './unk3_header';
import toolStruct from './tool_struct';
import armorStruct from './armor_struct';
import weaponStruct from './weapon_struct';
import cloakStruct from './cloak_struct';
import jewelryStruct from './jewelry_struct';
import bulletStruct from './bullet_struct';
import potionStruct from './potion_struct';
import batteryStruct from './battery_struct';
import oreStruct from './ore_struct';
import resourceStruct from './resource_struct';
import forceStruct from './force_struct';
import unitKeyStruct from './unitKey_struct';
import mapStruct from './map_struct';
import townStruct from './town_struct';
import dungeonKeyStruct from './dungeonKey_struct';
import towerStruct from './tower_struct';
import trapStruct from './trap_struct';
import siegeKitStruct from './siegeKit_struct';
import ticketStruct from './ticket_struct';
import recoveryStruct from './recovery_struct';
import boxStruct from './box_struct';
import cashMiningStruct from './cashMining_struct';
import radarStruct from './radar_struct';
import pagerStruct from './pager_struct';
import couponStruct from './coupon_struct';
import mauArmorStruct from './mauArmor_struct';
import mauWeaponStruct from './mauWeapon_struct';
import mauBackStruct from './mauBack_struct';
import mauBulletStruct from './mauBullet_struct';
import makeDataStruct from './makeData_struct';
import combineDataStruct from './combineData_struct';
import unk3Struct from './unk3_struct';

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
    skipBlocks: true,
  },
  {
    type: MAKETOOL,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: POTION,
    header: defaultHeader,
    block: potionStruct,
    skipBlocks: true,
  },
  {
    type: BAG,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: BATTERY,
    header: defaultHeader,
    block: batteryStruct,
    skipBlocks: true,
  },
  {
    type: ORE,
    header: defaultHeader,
    block: oreStruct,
    skipBlocks: true,
  },
  {
    type: RESOURCE,
    header: defaultHeader,
    block: resourceStruct,
    skipBlocks: true,
  },
  {
    type: FORCE,
    header: defaultHeader,
    block: forceStruct,
    skipBlocks: true,
  },
  {
    type: UNITKEY,
    header: defaultHeader,
    block: unitKeyStruct,
    skipBlocks: true,
  },
  {
    type: BOOTY,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: MAP,
    header: defaultHeader,
    block: mapStruct,
    skipBlocks: true,
  },
  {
    type: TOWN,
    header: defaultHeader,
    block: townStruct,
    skipBlocks: true,
  },
  {
    type: DUNGEONKEY,
    header: defaultHeader,
    block: dungeonKeyStruct,
    skipBlocks: true,
  },
  {
    type: ANIMUS,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: TOWER,
    header: defaultHeader,
    block: towerStruct,
    skipBlocks: true,
  },
  {
    type: TRAP,
    header: defaultHeader,
    block: trapStruct,
    skipBlocks: true,
  },
  {
    type: SIEGEKIT,
    header: defaultHeader,
    block: siegeKitStruct,
    skipBlocks: true,
  },
  {
    type: TICKET,
    header: defaultHeader,
    block: ticketStruct,
    skipBlocks: true,
  },
  {
    type: QUEST,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: RECOVERY,
    header: defaultHeader,
    block: recoveryStruct,
    skipBlocks: true,
  },
  {
    type: BOX,
    header: defaultHeader,
    block: boxStruct,
    skipBlocks: true,
  },
  {
    type: FIRECRACKER,
    header: defaultHeader,
    block: toolStruct,
    skipBlocks: true,
  },
  {
    type: CASHMINING,
    header: defaultHeader,
    block: cashMiningStruct,
    skipBlocks: true,
  },
  {
    type: RADAR,
    header: defaultHeader,
    block: radarStruct,
    skipBlocks: true,
  },
  {
    type: PAGER,
    header: defaultHeader,
    block: pagerStruct,
    skipBlocks: true,
  },
  {
    type: COUPON,
    header: defaultHeader,
    block: couponStruct,
    skipBlocks: true,
  },
  ...[MAUHEAD, MAUUPPER, MAULOWER].map(type => ({
    type,
    header: defaultHeader,
    block: mauArmorStruct,
    skipBlocks: true,
  })),
  ...[MAUARM, MAUSHOULDER].map(type => ({
    type,
    header: defaultHeader,
    block: mauWeaponStruct,
    skipBlocks: true,
  })),
  {
    type: MAUBACK,
    header: defaultHeader,
    block: mauBackStruct,
    skipBlocks: true,
  },
  {
    type: MAUBULLET,
    header: defaultHeader,
    block: mauBulletStruct,
    skipBlocks: true,
  },
  {
    type: MAKEDATA,
    header: defaultHeader,
    block: makeDataStruct,
  },
  {
    type: COMBINEDATA,
    header: defaultHeader,
    block: combineDataStruct,
  },
  {
    type: UNK3,
    header: unk3Header,
    headerForceValues: {
      nCount: 2,
      nBlockSize: header => header.nTotalSize / 2,
    },
    block: unk3Struct,
  },
];

export default readerStruct;
