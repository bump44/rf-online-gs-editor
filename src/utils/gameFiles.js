import pickBy from 'lodash/pickBy';
import { FACE, UPPER } from '../structs/item_types';

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
  'Script/FaceItem.dat': {
    path: 'Script/FaceItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: FACE },
    extensions: ['dat'],
  },
  'Script/UpperItem.dat': {
    path: 'Script/UpperItem.dat',
    resolve: RESOLVERS.SERVER_ITEM,
    type: FILE_TYPE_SERVER,
    args: { type: UPPER },
    extensions: ['dat'],
  },
};

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
