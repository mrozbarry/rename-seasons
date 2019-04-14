const fs = require('fs');
const { checkFile } = require('./checkFile.js');

const readDir = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, result) => {
    if (err) return reject(err);
    return resolve(Promise.all(result.map(f => checkFile(f, dir))));
  })
});

module.exports = { readDir };
