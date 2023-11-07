import * as fs from 'fs';
import * as xlsx from 'xlsx';

export const translateImport = (
  fileName: string,
  translationFilePaths: { [key: string]: string },
) => {
  console.log(`Import started from file '${fileName}'`);

  const fileStrings = Object.keys(translationFilePaths).reduce<{
    [key: string]: string;
  }>((prev, curr) => {
    prev[curr] = fs
      .readFileSync(translationFilePaths[curr], { encoding: 'utf8' })
      .toString();
    return prev;
  }, {});

  const workbook = xlsx.readFile(fileName);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const data = xlsx.utils.sheet_to_json(worksheet);
  let result: { [key: string]: string } = {};
  for (let [lang, value] of Object.entries(fileStrings)) {
    result[lang] = value;
  }
  data.map((item): void => {
    // @ts-ignore
    const regexp = new RegExp('(' + item.key + ")(: [`'])(.*)([`'],?)");
    for (let [lang] of Object.entries(fileStrings)) {
      // @ts-ignore
      result[lang] = result[lang].replace(regexp, '$1$2' + item[lang] + '$4');
    }
  });

  for (let [lang, filePath] of Object.entries(translationFilePaths)) {
    fs.writeFileSync(filePath as string, result[lang]);
  }

  console.log('Import done.');
};
