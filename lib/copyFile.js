const fs = require('fs');
const process = require('process');
const CLI = process.env.NODE_ENV !== 'test';

const copyFile = (source, dest) => new Promise((resolve, reject) => {
  fs.copyFile(source, dest, (err) => {
    if (err) {
      if (CLI) console.error(err);
      return reject(err);
    }
    if (CLI) console.log('Copy', `"${source}" to "${dest}"`)
    return resolve();
  })
})

const copyFileDR = (source, dest) => new Promise((resolve) => {
  if (CLI) console.log('Copy', `"${source}" to "${dest}"`)
  resolve();
});

module.exports = { copyFile, copyFileDR };
