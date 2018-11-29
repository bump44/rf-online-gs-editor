const copyExtras = require('./internals/build-scripts/copy-extras.js');
const computeAppData = require('./internals/build-scripts/compute-app-data.js');

module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
  },
  electronPackagerConfig: {
    packageManager: 'yarn',
    asar: false,
    ignore: [
      '.vscode',
      'coverage',
      'extras',
      'internals',
      'out',
      'releaseFiles',
      'resources',
      'temporary',
    ],
    afterExtract: [copyExtras, computeAppData],
  },
  electronWinstallerConfig: {
    name: 'rf-online-gs-editor',
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: 'Omashu',
    name: 'rf-online-gs-editor',
  },
};
