import { execFile } from 'child_process';
import path from 'path';
import Promise from 'bluebird';

import { getRandomTmpPath } from './path';
import { mkdir, readFile, writeFile } from './fs';
import { words } from './random';

const cloneExe = (tmpPath, exePath) =>
  readFile(exePath).then(buf => {
    const name = words(10);
    const newFilePath = path.resolve(tmpPath, `${name}.exe`);
    return writeFile(newFilePath, buf);
  });

const createEdfByBuf = (tmpPath, buf) => {
  const name = words(10);
  const newFilePath = path.resolve(tmpPath, `${name}.edf`);
  return writeFile(newFilePath, buf);
};

const createDatByBuf = (tmpPath, buf) => {
  const name = words(10);
  const newFilePath = path.resolve(tmpPath, `${name}.dat`);
  return writeFile(newFilePath, buf);
};

// return dat buf
const execEdfToDat = (exePath, edfPath) => {
  const pathData = path.parse(edfPath);
  return new Promise((resolve, reject) => {
    execFile(exePath, [`${edfPath}`], err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  }).then(() => readFile(path.resolve(pathData.dir, `${pathData.name}.dat`)));
};

// return edf buf
const execDatToEdf = (exePath, datPath) => {
  const pathData = path.parse(datPath);
  return new Promise((resolve, reject) => {
    execFile(exePath, [`${datPath}`], err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  }).then(() =>
    readFile(path.resolve(pathData.dir, `${pathData.name}.dat.edf`)),
  );
};

export const deCryptByPath = edfPath =>
  readFile(edfPath).then(buf => deCryptByBuf(buf));

export const deCryptByBuf = edfBuf => {
  const tmpPath = getRandomTmpPath();
  const EdfDeCrypt = path.resolve('./', 'extras/EdfDeCrypt.exe');

  return mkdir(tmpPath)
    .then(() => cloneExe(tmpPath, EdfDeCrypt))
    .then(newExePath => [newExePath, createEdfByBuf(tmpPath, edfBuf)])
    .spread((exePath, edfPath) => execEdfToDat(exePath, edfPath));
};

export const enCryptByBuf = datBuf => {
  const tmpPath = getRandomTmpPath();
  const EdfCrypt = path.resolve('./', 'extras/EdfCrypt.exe');

  return mkdir(tmpPath)
    .then(() => cloneExe(tmpPath, EdfCrypt))
    .then(newExePath => [newExePath, createDatByBuf(tmpPath, datBuf)])
    .spread((exePath, datPath) => execDatToEdf(exePath, datPath));
};
