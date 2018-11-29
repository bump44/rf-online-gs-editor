import path from 'path';
import fs from 'fs-extra';

const application = (() => {
  try {
    const applicationPath = path.resolve('./', 'application.json');
    return JSON.parse(fs.readFileSync(applicationPath));
  } catch (err) {
    // ignore
    return {};
  }
})();

export default application;
