const { default: test } = require('ava');
const { buildOperations } = require('./buildOperations.js');

test('parses correctly', async (t) => {
  const filesIn = [
    '/tmp/show/season 1/show Season 1 Episode 5 - The Fifth Episode.mp4',
    '/tmp/show/season 1/show Season 1 Episode 6 - The Sixth Episode.mp4',
    '/tmp/show/season 1/show Season 1 Episode 7 - The Seventh Episode.mp4',
  ];

  const ops = await buildOperations({
    rules: {
      expression: 'Season (\\d+) Episode (\\d+) - (.+)\\.(.+)$',
      season: 1,
      episode: 2,
      title: 3,
      ext: 4,
    },
    dest: '/tmp/show/',
  }, filesIn);

  console.log('operations', ops);
  
  t.deepEqual(ops, [
    ['/tmp/show/season 1/show Season 1 Episode 5 - The Fifth Episode.mp4', '/tmp/show/S01E05 - The Fifth Episode.mp4'],
    ['/tmp/show/season 1/show Season 1 Episode 6 - The Sixth Episode.mp4', '/tmp/show/S01E06 - The Sixth Episode.mp4'],
    ['/tmp/show/season 1/show Season 1 Episode 7 - The Seventh Episode.mp4', '/tmp/show/S01E07 - The Seventh Episode.mp4'],
  ]);
});

