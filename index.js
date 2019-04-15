const process = require('process');
const { app } = require('./app.js');

const getCliOption = (keys) => {
  const index = process.argv.findIndex(p => keys.indexOf(p) >= 0);
  if (index === -1) return undefined;
  return process.argv[index + 1];
};

const source = getCliOption(['-s', '--source'])
if (!source) {
  throw new Error(`Must provide a source path and optional dest path
node rename-seasons.js --source path/to/files [--dest output path]`);
}

const options = {
  source,
  dest: getCliOption(['-d', '--dest']) || source,
  dryRun: getCliOption(['--dry-run']),
  ignore: getCliOption(['--ignore']) || '',
};

app(options, getCliOption(['-r', '--rules']))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(2);
  });

