const { default: test } = require('ava');
const path = require('path');
const fs = require('fs');
const { app } = require('./app.js');
const { readDir } = require('./lib/readDir.js');

const rmRf = async (dir) => {
  const files = await readDir(dir);
  files.forEach(async (f) => await fs.unlink(f.file, () => {}));
  return new Promise((resolve, reject) => {
    fs.rmdir(dir, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

test('copies show1', async (t) => {
  const dest = path.resolve(__dirname, 'test/show1-after');

  try {
    await app({
      source: path.resolve(__dirname, 'test/show1'),
      dest,
    }, path.resolve(__dirname, 'test', 'show1.rules.json'));

    const results = await readDir(dest);
    const output = results.map(f => f.file).sort()
    const expected = [
      path.resolve(dest, 'S01E01 - Bar.nil'),
      path.resolve(dest, 'S02E01 - Foo.nil'),
      path.resolve(dest, 'S02E02 - Title.nil'),
      path.resolve(dest, 'S03E01 - Episode.nil'),
      path.resolve(dest, 'S03E02 - Testing stuff.nil'),
    ].sort();

    t.deepEqual(output, expected);

  } catch (e) {
    t.is(true, false, e.toString());
  }

  await rmRf(dest);
});
