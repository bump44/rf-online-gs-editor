import defaultHeader from './default_header';
import boneStruct from './bone_struct';
import meshStruct from './mesh_struct';
import aniStruct from './ani_struct';

import * as RESOURCE_TYPES from '~/structs/resource_types';

const readerStruct = [
  {
    type: RESOURCE_TYPES.PLAYER_BONE1,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_MESH1,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_ANI1,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.MONSTER_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.MONSTER_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.MONSTER_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.ANIMUS_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.ANIMUS_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.ANIMUS_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.TOWER_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.TOWER_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.TOWER_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.STORE_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.STORE_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.STORE_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.ITEM_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.ITEM_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.ITEM_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.MAU_BONE,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.MAU_MESH,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.MAU_ANI,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_BONE2,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_MESH2,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_ANI2,
    header: defaultHeader,
    block: aniStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_BONE3,
    header: defaultHeader,
    block: boneStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_MESH3,
    header: defaultHeader,
    block: meshStruct,
  },
  {
    type: RESOURCE_TYPES.PLAYER_ANI3,
    header: defaultHeader,
    block: aniStruct,
  },
];

export default readerStruct;
