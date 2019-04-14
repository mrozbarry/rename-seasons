const { flatten } = require('./flatten.js');
const path = require('path');

const pad = n => n.toString().replace(/^[0]+/, '').padStart(2, '0');

const buildOperations = (options, videoFiles) => {
  const rx = new RegExp(options.rules.expression);

  const transformName = (file) => {
    const matches = file.match(rx);
    return `S${pad(matches[options.rules.season])}E${pad(matches[options.rules.episode])} - ${matches[options.rules.title]}.${matches[options.rules.ext]}`;
  };

  console.log('buildOps.videoFiles', videoFiles);
  console.log('flattened', flatten(videoFiles));

  return Promise.resolve(videoFiles)
    .then(files => {
      const parsed = flatten(files)
        .map(f => path.parse(f))
        .filter(f => f.dir.indexOf(options.ignore) === -1);

      const toFile = x => `${x.name}${x.ext}`;
      const matching = parsed.filter(f => rx.test(toFile(f)));

      return matching
        .map(p => {
          return [path.resolve(p.dir, p.base), path.resolve(options.dest, transformName(toFile(p)))]
        })
    })
}

module.exports = { buildOperations };
