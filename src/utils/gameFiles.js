import { pickBy, upperFirst } from 'lodash';

import * as ITEM_TYPES from '~/structs/item_types';

// Client DataFiles
export const FILE_TYPE_CLIENT = 'CLIENT';

// Client DataLocaleFiles
export const FILE_TYPE_CLIENT_ND = 'CLIENT_ND';

// Server DataFiles
export const FILE_TYPE_SERVER = 'SERVER';

// Server DataLocaleFiles
export const FILE_TYPE_SERVER_STR = 'SERVER_STR';

// Server DataMapSptFiles
export const FILE_TYPE_SERVER_MAP_SPT = 'SERVER_MAP_SPT';
export const FILE_TYPE_SERVER_MAP_PORTAL = 'SERVER_MAP_PORTAL';
export const FILE_TYPE_SERVER_MAP_BLOCK = 'SERVER_MAP_BLOCK';
export const FILE_TYPE_SERVER_MAP_ACTIVE = 'SERVER_MAP_ACTIVE';

// All Of File Types
export const FILE_TYPES = {
  FILE_TYPE_CLIENT,
  FILE_TYPE_SERVER,
  FILE_TYPE_CLIENT_ND,
  FILE_TYPE_SERVER_STR,
};

// Saga resolvers
export const RESOLVERS = {
  CLIENT_ITEM: 'clientItemResolve',
  CLIENT_ITEMND: 'clientItemNDResolve',
  CLIENT_STORE: 'clientStoreResolve',
  CLIENT_RESOURCE: 'clientResourceResolve',
  SERVER_ITEM: 'serverItemResolve',
  SERVER_STORE: 'serverStoreResolve',
  SERVER_NPCHARACTER: 'serverNPCharacterResolve',
  SERVER_BOXITEMOUT: 'serverBoxItemOutResolve',
  SERVER_MAPSPT: 'serverMapSptResolve',
  SERVER_MAPPORTAL: 'serverMapPortalResolve',
  SERVER_MAPBLOCK: 'serverMapBlockResolve',
  SERVER_MAPACTIVE: 'serverMapActiveResolve',
};

// All of resolved files
export const FILES = {
  'Map/[mapname]/[mapname].spt': {
    path: 'Map/[mapname]/[mapname].spt',
    resolve: RESOLVERS.SERVER_MAPSPT,
    type: FILE_TYPE_SERVER_MAP_SPT,
    extensions: ['spt'],
  },
  'Map/[mapname]/[mapname]-PORTAL.dat': {
    path: 'Map/[mapname]/[mapname]-PORTAL.dat',
    resolve: RESOLVERS.SERVER_MAPPORTAL,
    type: FILE_TYPE_SERVER_MAP_PORTAL,
    extensions: ['dat'],
  },
  'Map/[mapname]/[mapname]-BLOCK.dat': {
    path: 'Map/[mapname]/[mapname]-BLOCK.dat',
    resolve: RESOLVERS.SERVER_MAPBLOCK,
    type: FILE_TYPE_SERVER_MAP_BLOCK,
    extensions: ['dat'],
  },
  'Map/[mapname]/[activename].dat': {
    path: 'Map/[mapname]/[activename].dat',
    resolve: RESOLVERS.SERVER_MAPACTIVE,
    type: FILE_TYPE_SERVER_MAP_ACTIVE,
    extensions: ['dat'],
  },
  'DataTable/Item.edf': {
    path: 'DataTable/Item.edf',
    resolve: RESOLVERS.CLIENT_ITEM,
    type: FILE_TYPE_CLIENT,
    extensions: ['dat', 'edf'],
  },
  'DataTable/Store.edf': {
    path: 'DataTable/Store.edf',
    resolve: RESOLVERS.CLIENT_STORE,
    type: FILE_TYPE_CLIENT,
    extensions: ['dat', 'edf'],
  },
  'DataTable/Resource.edf': {
    path: 'DataTable/Resource.edf',
    resolve: RESOLVERS.CLIENT_RESOURCE,
    type: FILE_TYPE_CLIENT,
    extensions: ['dat', 'edf'],
  },
  'DataTable/[locale]/NDItem.edf': {
    path: 'DataTable/[locale]/NDItem.edf',
    resolve: RESOLVERS.CLIENT_ITEMND,
    type: FILE_TYPE_CLIENT_ND,
    extensions: ['dat', 'edf'],
  },
  'Script/StoreList.dat': {
    path: 'Script/StoreList.dat',
    resolve: RESOLVERS.SERVER_STORE,
    type: FILE_TYPE_SERVER,
    extensions: ['dat'],
  },
  'Script/NPCharacter.dat': {
    path: 'Script/NPCharacter.dat',
    resolve: RESOLVERS.SERVER_NPCHARACTER,
    type: FILE_TYPE_SERVER,
    extensions: ['dat'],
  },
  'Script/BoxItemOut.dat': {
    path: 'Script/BoxItemOut.dat',
    resolve: RESOLVERS.SERVER_BOXITEMOUT,
    type: FILE_TYPE_SERVER,
    extensions: ['dat'],
  },
  'Script/Firecracker.dat': {
    path: 'Script/Firecracker.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.FIRECRACKER },
    extensions: ['dat'],
  },
  'Script/GuardTowerItem.dat': {
    path: 'Script/GuardTowerItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.TOWER },
    extensions: ['dat'],
  },
  'Script/EventItem.dat': {
    path: 'Script/EventItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.QUEST },
    extensions: ['dat'],
  },
  'Script/UnitBullet.dat': {
    path: 'Script/UnitBullet.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUBULLET },
    extensions: ['dat'],
  },
  'Script/UnitArms.dat': {
    path: 'Script/UnitArms.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUARM },
    extensions: ['dat'],
  },
  'Script/UnitBack.dat': {
    path: 'Script/UnitBack.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUBACK },
    extensions: ['dat'],
  },
  'Script/UnitHead.dat': {
    path: 'Script/UnitHead.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUHEAD },
    extensions: ['dat'],
  },
  'Script/UnitLower.dat': {
    path: 'Script/UnitLower.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAULOWER },
    extensions: ['dat'],
  },
  'Script/UnitShoulder.dat': {
    path: 'Script/UnitShoulder.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUSHOULDER },
    extensions: ['dat'],
  },
  'Script/UnitUpper.dat': {
    path: 'Script/UnitUpper.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.MAUUPPER },
    extensions: ['dat'],
  },
  'Script/NPCLinkItem.dat': {
    path: 'Script/NPCLinkItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.PAGER },
    extensions: ['dat'],
  },
  'Script/UnmannedMiner.dat': {
    path: 'Script/UnmannedMiner.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.CASHMINING },
    extensions: ['dat'],
  },
  'Script/BattleDungeonItem.dat': {
    path: 'Script/BattleDungeonItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: ITEM_TYPES.DUNGEONKEY },
    extensions: ['dat'],
  },
};

Object.values(ITEM_TYPES)
  .filter(
    type =>
      [
        ITEM_TYPES.UNK3,
        ITEM_TYPES.COMBINEDATA,
        ITEM_TYPES.MAUBULLET,
        ITEM_TYPES.MAUARM,
        ITEM_TYPES.MAUBACK,
        ITEM_TYPES.MAUHEAD,
        ITEM_TYPES.MAULOWER,
        ITEM_TYPES.MAUSHOULDER,
        ITEM_TYPES.MAUUPPER,
        ITEM_TYPES.MAKEDATA,
        ITEM_TYPES.PAGER,
        ITEM_TYPES.CASHMINING,
        ITEM_TYPES.FIRECRACKER,
        ITEM_TYPES.DUNGEONKEY,
        ITEM_TYPES.TOWER,
        ITEM_TYPES.QUEST,
      ].indexOf(type) === -1,
  )
  .forEach(type => {
    const path = `Script/${upperFirst(type)}Item.dat`;

    // check the presence, so that you do not accidentally overwrite existing ones with such a filling
    if (FILES[path] !== undefined) {
      throw new Error(`File by path ${path} already exists`);
    }

    FILES[path] = {
      path,
      resolve: RESOLVERS.SERVER_ITEM,
      type: FILE_TYPE_SERVER,
      args: { type },
      extensions: ['dat'],
    };
  });

// All of resolved client files
export const CLIENT_FILES = pickBy(
  FILES,
  file => file.type === FILE_TYPE_CLIENT,
);

// All of resolved client nd files
export const CLIENT_ND_FILES = pickBy(
  FILES,
  file => file.type === FILE_TYPE_CLIENT_ND,
);

// All of resolved server files
export const SERVER_FILES = pickBy(
  FILES,
  file => file.type === FILE_TYPE_SERVER,
);

// All of resolved server str files
export const SERVER_STR_FILES = pickBy(
  FILES,
  file => file.type === FILE_TYPE_SERVER_STR,
);

// All of resolved server map spt files
export const SERVER_MAP_FILES = pickBy(FILES, file =>
  [
    FILE_TYPE_SERVER_MAP_SPT,
    FILE_TYPE_SERVER_MAP_PORTAL,
    FILE_TYPE_SERVER_MAP_BLOCK,
    FILE_TYPE_SERVER_MAP_ACTIVE,
  ].includes(file.type),
);
