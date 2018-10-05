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
  SelectFolder: {
    id: 'app.containers.ProjectImportPage.SelectFolder',
    defaultMessage: 'Select Folder',
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
  RewriteItems: {
    id: 'app.containers.ProjectImportPage.RewriteItems',
    defaultMessage: 'Rewrite items if they already exist',
  },
  SkipItems: {
    id: 'app.containers.ProjectImportPage.RewriteItems',
    defaultMessage: 'Skip items if they already exist',
  },
  SelectFile: {
    id: 'app.containers.ProjectImportPage.SelectFile',
    defaultMessage: 'Select file',
  },
  Start: {
    id: 'app.containers.ProjectImportPage.Start',
    defaultMessage: 'Start',
  },
  Cancel: {
    id: 'app.containers.ProjectImportPage.Cancel',
    defaultMessage: 'Cancel',
  },
});
