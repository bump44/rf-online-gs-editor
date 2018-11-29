module.exports = objectPath =>
  [
    // ignore all tests
    () => /^\/src.*?\/tests(\/.+?\.test\.js)?$/g.test(objectPath),
    // ignore main folders
    () =>
      /^\/(resources|\.vscode|coverage|extras|internals|out|releaseFiles|temporary)\/?$/g.test(
        objectPath,
      ),
  ].some(fnc => fnc());
