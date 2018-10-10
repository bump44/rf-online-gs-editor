const copyExtras = require('./internals/build-scripts/copy-extras.js');

module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
  },
  electronPackagerConfig: {
    packageManager: 'yarn',
    asar: true,
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
    afterExtract: [copyExtras],
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
