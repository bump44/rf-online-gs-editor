import fs from 'fs';
import mkdirp from 'mkdirp';
import Promise from 'bluebird';
import rimraf from 'rimraf';

export const isExists = path =>
  new Promise(resolve => {
    fs.stat(path, (err, stat) => {
      if (err) {
        return resolve(false);
      }

      return resolve(stat);
    });
  });

export const readDir = dirPath =>
  new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    });
  });

export const readFile = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buf) => {
      if (err) {
        return reject(err);
      }

      return resolve(buf);
    });
  });

export const writeFile = (filePath, buf) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, buf, err => {
      if (err) {
        return reject(err);
      }

      return resolve(filePath);
    });
  });

export const mkdir = path =>
  new Promise((resolve, reject) => {
    mkdirp(path, err => {
      if (err) {
        return reject(err);
      }

      return resolve(path);
    });
  });

export const mkdirSync = path => mkdirp.sync(path);

export const rmdir = path =>
  new Promise((resolve, reject) => {
    rimraf(path, [], err => {
      if (err) {
        return reject(err);
      }

      return resolve(path);
    });
  });
