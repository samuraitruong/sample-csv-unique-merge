const fs = require('fs');

(async () => {
  const readFile = (file) => {
    const csv = fs.readFileSync(file, 'utf8').split('\n');
    const sourceDict = {};
    csv.forEach((line) => {
      const phone = line.split(',')[1];
      sourceDict[phone] = line;
    });
    return sourceDict;
  };
  const source = readFile('data/source.csv');
  const update = readFile('data/update.csv');
  const duplicated = Object.keys(source).filter((x) => update[x]);
  const dupDict = new Set(duplicated);

  fs.writeFileSync(
    'data/duplicated.csv',
    duplicated.map((x) => source[x]).join('\n'),
  );

  fs.writeFileSync(
    'data/source_filtered.csv',
    Object.keys(source)
      .filter((x) => !dupDict[x])
      .map((x) => source[x])
      .join('\n'),
  );

  fs.writeFileSync(
    'data/update_filtered.csv',
    Object.keys(update)
      .filter((x) => !dupDict[x])
      .map((x) => update[x])
      .join('\n'),
  );
})();
