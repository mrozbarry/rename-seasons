const fs = require('fs');
const { copyFile, copyFileDR } = require('./lib/copyFile.js');
const { buildOperations } = require('./lib/buildOperations.js');
const { videoFiles } = require('./lib/videoFiles.js');
const { readDir } = require('./lib/readDir.js');

const defaultRules = {
  expression: "Season (\d+) Episode (\d+) - (.+).(.+)$",
  season: 1,
  episode: 2,
  title: 3,
  ext: 4,
};

const getRules = (file) => new Promise((resolve) => {
  if (!file) return resolve(defaultRules);

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) return resolve(defaultRules);
    return resolve(JSON.parse(data));
  });
});

const app = async (options, rulesFile) => {
  const rules = await getRules(rulesFile);
  const files = await videoFiles(options.source);
  const ops = await buildOperations({ ...options, rules }, files);
  const copy = options.dryRun ? copyFileDR : copyFile;
  if (!options.dryRun) {
    await readDir(options.dest).catch(() => {
      return new Promise((resolve) => {
        fs.mkdir(options.dest, { recursive: true }, () => {
          resolve();
        });
      });
    });

  }

  return Promise.all(ops.map(op => copy(op[0], op[1])));
};

module.exports = { app };
