const fs = require('fs');
const path = require('path');

const checkFile = (file, parent) => new Promise((resolve) => {
  const fullPath = path.resolve(parent, file);
  fs.stat(fullPath, (err, stats) => {
    if (err) return resolve({ file: fullPath, isDir: false });
    return resolve({ file: fullPath, isDir: stats.isDirectory() })
  })
})

module.exports = { checkFile };
