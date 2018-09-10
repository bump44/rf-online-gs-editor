/*
 * ProjectImportPage Messages
 *
 * This contains all the text for the ProjectImportPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.ProjectImportPage.header',
    defaultMessage: '{title} imports',
  },
  clientHelpMessage: {
    id: 'app.containers.ProjectImportPage.clientHelpMessage',
    defaultMessage: 'Select files to import. Supported edf & dat formats.',
  },
  nothingSelected: {
    id: 'app.containers.ProjectImportPage.nothingSelected',
    defaultMessage: 'Nothing selected...',
  },
  ClientFiles: {
    id: 'app.containers.ProjectImportPage.ClientFiles',
    defaultMessage: 'Client Files',
  },
  ServerFiles: {
    id: 'app.containers.ProjectImportPage.ServerFiles',
    defaultMessage: 'Server Files',
  },
});
