const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = (extractPath, electronVersion, platform, arch, done) => {
  const packagejsonPath = path.resolve(__dirname, '../../package.json');
  const writeToPath = path.resolve(extractPath, 'application.json');

  const packagejson = JSON.parse(fs.readFileSync(packagejsonPath).toString());
  const application = {
    name: packagejson.name,
    productName: packagejson.productName,
    description: packagejson.description,
    author: packagejson.author,
    license: packagejson.license,
    version: packagejson.version,
  };

  // eslint-disable-next-line
  console.log(`

${chalk.yellow('build-scripts:compute-app-data')}
${Object.keys(application)
    .map(key => ` ${chalk.cyanBright(`${key}:`)} ${application[key]}`)
    .join('\n')}`);

  try {
    fs.writeFileSync(writeToPath, JSON.stringify(application));

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
