const copyExtras = require('./internals/build-scripts/copy-extras.js');
const computeAppData = require('./internals/build-scripts/compute-app-data.js');
const isIgnoreThis = require('./internals/build-scripts/is-ignore-this.js');

module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
  },
  electronPackagerConfig: {
    packageManager: 'yarn',
    asar: true,
    ignore: isIgnoreThis,
    afterExtract: [copyExtras, computeAppData],
    overwrite: true,
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
