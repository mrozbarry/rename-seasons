const path = require('path');
const { readDir } = require('./readDir.js');
const { flatten } = require('./flatten.js');

const videoFiles = (dir) =>{
  return readDir(dir)
    .then(results => {
      const files = results.filter(r => !r.isDir).map(r => path.resolve(dir, r.file));
      return Promise.all(results.filter(r => r.isDir).map(r => path.resolve(dir, r.file)).map(videoFiles))
        .then(childFiles => {
          return flatten(files.concat(childFiles));
        });
    });
};

module.exports = { videoFiles };
