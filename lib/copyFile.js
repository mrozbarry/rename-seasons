const fs = require('fs');

const copyFile = (source, dest) => new Promise((resolve, reject) => {
  fs.copyFile(source, dest, (err) => {
    if (err) {
      console.error(err);
      return reject(err);
    }
    console.log('Copy', `"${source}" to "${dest}"`)
    return resolve();
  })
})

const copyFileDR = (source, dest) => new Promise((resolve) => {
  console.log('Copy', `"${source}" to "${dest}"`)
  resolve();
});

module.exports = { copyFile, copyFileDR };
