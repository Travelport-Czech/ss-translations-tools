import * as fs from 'fs'
import * as xlsx from 'xlsx'

export const translateImport = (fileName: string, translationFilePaths: { [key: string]: string }) => {
  console.log(`Import started from file '${fileName}'`)

  const fileStrings = Object.keys(translationFilePaths).reduce((prev, curr) => {
    prev[curr] = fs.readFileSync(translationFilePaths[curr], { encoding: 'utf8' }).toString()
    return prev
  }, {})

  const workbook = xlsx.readFile(fileName)
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]

  const data = xlsx.utils.sheet_to_json(worksheet)
  data.map((item): void => {
    // @ts-ignore
    const regexp = new RegExp('(.*' + item.key + ")(: [`'])(.*)([`'],?)")
    for (let [lang, value] of Object.entries(fileStrings)) {
      // @ts-ignore
      const newFile = value.replace(regexp, '$1$2' + item[lang] + '$4')
      const filePath = translationFilePaths[lang]
      fs.writeFileSync(filePath, newFile)
    }
  })

  console.log('Import done.')
}
