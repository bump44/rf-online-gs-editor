import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
} from './constants';

import {
  announceProjectCountItems,
  announceProjectCountStores,
  announceProjectCountBoxItemOuts,
  announceProjectCountHandler,
} from './actions/announces';

import {
  projectsImportsStartFileImport,
  projectsImportsCancelFileImport,
  projectsImports,
  projectsImportsActionNames,
  projectsImportsBindActions,
  projectsImportsBindActionsWithFileKey,
} from './actions/projectsImports';

import {
  projectsImportsServerMapsStartMapImport,
  projectsImportsServerMapsCancelMapImport,
  projectsImportsServerMaps,
  projectsImportsServerMapsActionNames,
  projectsImportsServerMapsBindActions,
  projectsImportsServerMapsBindActionsWithMapName,
} from './actions/projectsImportsServerMaps';

import {
  projectsExportsStartFileExport,
  projectsExportsCancelFileExport,
  projectsExports,
  projectsExportsActionNames,
  projectsExportsBindActions,
  projectsExportsBindActionsWithFileKey,
} from './actions/projectsExports';

import {
  projectsExportsServerMapsStartMapExport,
  projectsExportsServerMapsCancelMapExport,
  projectsExportsServerMaps,
  projectsExportsServerMapsActionNames,
  projectsExportsServerMapsBindActions,
  projectsExportsServerMapsBindActionsWithMapName,
} from './actions/projectsExportsServerMaps';

import {
  projectsNextValuesChangePropValue,
  projectsNextValuesChangeIsSaving,
  projectsNextValuesChangeIsSaved,
  projectsNextValuesChangeIsError,
  projectsNextValuesChangeErrorMessage,
  projectsNextValuesChangeNextValue,
} from './actions/projectsNextValues';

import {
  projectsEntriesFinder,
  projectsEntriesFinderItemsBindActions,
  projectsEntriesFinderStoresBindActions,
} from './actions/projectsEntriesFinder';

import {
  projectsItems,
  projectsItemsActionNames,
  projectsItemsBindActions,
} from './actions/projectsItems';

import {
  projectsStores,
  projectsStoresActionNames,
  projectsStoresBindActions,
} from './actions/projectsStores';

import {
  projectsBoxItemOuts,
  projectsBoxItemOutsActionNames,
  projectsBoxItemOutsBindActions,
} from './actions/projectsBoxItemOuts';

import {
  projectsMapSpts,
  projectsMapSptsActionNames,
  projectsMapSptsBindActions,
} from './actions/projectsMapSpts';

import {
  projectsResources,
  projectsResourcesActionNames,
  projectsResourcesBindActions,
} from './actions/projectsResources';

export {
  announceProjectCountItems,
  announceProjectCountStores,
  announceProjectCountBoxItemOuts,
  announceProjectCountHandler,
};
export {
  projectsImportsStartFileImport,
  projectsImportsCancelFileImport,
  projectsImports,
  projectsImportsActionNames,
  projectsImportsBindActions,
  projectsImportsBindActionsWithFileKey,
};
export {
  projectsImportsServerMapsStartMapImport,
  projectsImportsServerMapsCancelMapImport,
  projectsImportsServerMaps,
  projectsImportsServerMapsActionNames,
  projectsImportsServerMapsBindActions,
  projectsImportsServerMapsBindActionsWithMapName,
};
export {
  projectsExportsStartFileExport,
  projectsExportsCancelFileExport,
  projectsExports,
  projectsExportsActionNames,
  projectsExportsBindActions,
  projectsExportsBindActionsWithFileKey,
};
export {
  projectsExportsServerMapsStartMapExport,
  projectsExportsServerMapsCancelMapExport,
  projectsExportsServerMaps,
  projectsExportsServerMapsActionNames,
  projectsExportsServerMapsBindActions,
  projectsExportsServerMapsBindActionsWithMapName,
};
export {
  projectsNextValuesChangePropValue,
  projectsNextValuesChangeIsSaving,
  projectsNextValuesChangeIsSaved,
  projectsNextValuesChangeIsError,
  projectsNextValuesChangeErrorMessage,
  projectsNextValuesChangeNextValue,
};
export {
  projectsEntriesFinder,
  projectsEntriesFinderItemsBindActions,
  projectsEntriesFinderStoresBindActions,
};
export { projectsItems, projectsItemsActionNames, projectsItemsBindActions };
export { projectsStores, projectsStoresActionNames, projectsStoresBindActions };
export {
  projectsBoxItemOuts,
  projectsBoxItemOutsActionNames,
  projectsBoxItemOutsBindActions,
};
export {
  projectsMapSpts,
  projectsMapSptsActionNames,
  projectsMapSptsBindActions,
};
export {
  projectsResources,
  projectsResourcesActionNames,
  projectsResourcesBindActions,
};

/**
 * Current User Actions
 */

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user,
  };
}

export function changeCurrentUserToken(token) {
  return {
    type: CHANGE_CURRENT_USER_TOKEN,
    token,
  };
}

export function logoutCurrentUser() {
  return {
    type: LOGOUT_CURRENT_USER,
  };
}
