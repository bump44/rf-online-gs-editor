import Promise from 'bluebird';
import { copy } from 'fs-extra';
import { execFile } from 'child_process';
import path from 'path';

import { getRandomTmpPath } from './path';
import { mkdir, readDir } from './fs';

export const repack = async (records = []) => {
  const tmpPath = getRandomTmpPath();
  await mkdir(tmpPath);

  const RFSRePack = path.resolve('./', 'extras/RFSRePack.exe');
  const RFOdpf = path.resolve('./', 'extras/RFO.dpf');

  const tmpExecName = 'RFSRePack.exe';
  const tmpRFOdpfName = 'RFO.dpf';
  const tmpPackedRfsName = 'PACKED.RFS';

  const tmpExecPath = path.resolve(tmpPath, tmpExecName);
  const tmpRFOdpfPath = path.resolve(tmpPath, tmpRFOdpfName);
  const tmpPackedRfsPath = path.resolve(tmpPath, tmpPackedRfsName);

  await copy(RFSRePack, tmpExecPath);
  await copy(RFOdpf, tmpRFOdpfPath);

  const data = records.map(record => ({
    ...record,
    tmpPath: path.resolve(tmpPath, record.name),
  }));

  // copy records to tmp fld
  await Promise.each(data, file => copy(file.path, file.tmpPath));

  // exec rfs repack
  await new Promise((res, rej) =>
    execFile(
      tmpExecPath,
      data.map(file => file.tmpPath),
      err => (err ? rej(err) : res()),
    ),
  );

  return tmpPackedRfsPath;
};

export const unpackByPath = async rfsPath => {
  const tmpPath = getRandomTmpPath();
  const details = path.parse(rfsPath);
  const RFSUnPack = path.resolve('./', 'extras/RFSUnPack.exe');
  const RFOdpf = path.resolve('./', 'extras/RFO.dpf');

  const tmpRfsName = details.base;
  const tmpExecName = 'RFSUnPack.exe';
  const tmpRFOdpfName = 'RFO.dpf';

  const tmpRfsPath = path.resolve(tmpPath, tmpRfsName);
  const tmpExecPath = path.resolve(tmpPath, tmpExecName);
  const tmpRFOdpfPath = path.resolve(tmpPath, tmpRFOdpfName);

  await mkdir(tmpPath);

  await copy(rfsPath, tmpRfsPath);
  await copy(RFSUnPack, tmpExecPath);
  await copy(RFOdpf, tmpRFOdpfPath);

  // exec rfs unpack
  await new Promise((res, rej) =>
    execFile(tmpExecPath, [`${tmpRfsPath}`], err => (err ? rej(err) : res())),
  );

  const exclude = [tmpRfsName, tmpExecName, tmpRFOdpfName];

  return (await readDir(tmpPath))
    .filter(fileName => !exclude.includes(fileName))
    .map(fileName => ({
      fileName: fileName.toUpperCase(),
      filePath: path.resolve(tmpPath, fileName),
      directoryPath: tmpPath,
    }));
};
