const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = (extractPath, electronVersion, platform, arch, done) => {
  const copyFrom = path.resolve(__dirname, '../../extras');
  const copyTo = path.resolve(extractPath, 'extras');

  // eslint-disable-next-line
  console.log(`

${chalk.yellow('build-scripts:copy-extras')}
  ${chalk.cyanBright('from:')} ${copyFrom}
  ${chalk.cyanBright('to:')} ${copyTo}`);

  try {
    fs.copySync(copyFrom, copyTo);

    // eslint-disable-next-line
    console.log(`   ${chalk.green('done')}
    `);

    done();
  } catch (err) {
    // eslint-disable-next-line
    console.log(`   ${chalk.red('failed')} ${err.message}
    `);

    done(err);
  }
};
