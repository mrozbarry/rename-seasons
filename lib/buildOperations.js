const path = require('path');
const { flatten } = require('./flatten.js');

const pad = n => n.toString().replace(/^[0]+/, '').padStart(2, '0');

const buildOperations = async (options, videoFiles) => {
  const rx = new RegExp(options.rules.expression);

  const transformName = (file) => {
    const matches = file.match(rx);
    return `S${pad(matches[options.rules.season])}E${pad(matches[options.rules.episode])} - ${matches[options.rules.title]}.${matches[options.rules.ext]}`;
  };
  const toFile = x => `${x.name}${x.ext}`;

  const parsed = flatten(videoFiles)
    .map(f => path.parse(f))
    .filter(f => f.dir.indexOf(options.ignore) === -1);

  const matching = parsed.filter(f => rx.test(toFile(f)));

  return matching.map(p => (
    [
      path.resolve(p.dir, p.base),
      path.resolve(options.dest, transformName(toFile(p))),
    ]
  ));
};

module.exports = { buildOperations };
