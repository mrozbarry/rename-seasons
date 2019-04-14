const fs = require('fs');
const path = require('path');
const process = require('process');

const { copyFile, copyFileDR } = require('./lib/copyFile.js');
const { buildOperations } = require('./lib/buildOperations.js');

const getCliOption = (keys) => {
  const index = process.argv.findIndex(p => keys.indexOf(p) >= 0);
  if (index === -1) return undefined;
  return process.argv[index + 1];
};

const defaultRules = {
  expression: "Season (\d+) Episode (\d+) - (.+).(.+)$",
  season: 1,
  episode: 2,
  title: 3,
  ext: 4,
};

const getRules = (file) => {
  return Promise.resolve(defaultRules);
}

const source = getCliOption(['-s', '--source'])
if (!source) {
  throw new Error(`Must provide a source path and optional dest path
node rename-seasons.js --source path/to/files [--dest output path]`);
}

getRules(getCliOption(['-r', '--rules']))
  .then((rules) => {
    const dryRun = getCliOption(['--dry-run']);
    return videoFiles(source)
      .then(files =>
        buildOperations({
          dest: getCliOption(['-d', '--dest']) || source,
          rules: rules,
          ignore: getCliOption(['--ignore']) || '',
        }, files).then(ops => [ops, dryRun ? copyFileDR : copyFile])
      );
  })
  .then([ops, copyFn] => Promise.all(ops.map(op => copyFn(op[0], op[1]))))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(2);
  });

