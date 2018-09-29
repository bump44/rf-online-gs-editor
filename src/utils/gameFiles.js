import { pickBy, upperFirst } from 'lodash';
import * as ITEM_TYPES from '../structs/item_types';

// Client DataFiles
export const FILE_TYPE_CLIENT = 'CLIENT';

// Client DataLocaleFiles
export const FILE_TYPE_CLIENT_ND = 'CLIENT_ND';

// Server DataFiles
export const FILE_TYPE_SERVER = 'SERVER';

// Server DataLocaleFiles
export const FILE_TYPE_SERVER_STR = 'SERVER_STR';

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
  CLIENT_ITEM_ND: 'clientItemND',
  CLIENT_STORE: 'clientStoreResolve',
  SERVER_ITEM: 'serverItemResolve',
  SERVER_STORE: 'serverStoreResolve',
  SERVER_BOX_ITEM_OUT: 'serverBoxItemOutResolve',
};

// All of resolved files
export const FILES = {
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
  'DataTable/[locale]/NDItem.edf': {
    path: 'DataTable/[locale]/NDItem.edf',
    resolve: RESOLVERS.CLIENT_ITEM_ND,
    type: FILE_TYPE_CLIENT_ND,
    extensions: ['dat', 'edf'],
  },
  // example
  'Script/StoreList.dat': {
    path: 'Script/StoreList.dat',
    resolve: RESOLVERS.SERVER_STORE,
    type: FILE_TYPE_SERVER,
    extensions: ['dat'],
  },
  'Script/BoxItemOut.dat': {
    path: 'Script/BoxItemOut.dat',
    resolve: RESOLVERS.SERVER_BOX_ITEM_OUT,
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
