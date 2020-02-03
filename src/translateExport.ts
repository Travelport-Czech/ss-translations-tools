import * as xlsx from 'xlsx'
import { TranslationKeysBase } from './TranslationKeysBase'

export const translateExport = (
  translations: { [key: string]: TranslationKeysBase },
  translationEnum: { [key: string]: string },
  fileName: string
) => {
  console.log('Export started.')

  const workbook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet([['key', ...Object.keys(translations)]])

  Object.keys(translationEnum).filter((item: string): void => {
    const data = {
      key: item
    }
    for (let [key, value] of Object.entries(translations)) {
      data[key] = value[item]
    }
    xlsx.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: -1 })
  })

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Translations')
  xlsx.writeFile(workbook, fileName)

  // tslint:disable-next-line
  console.log('Export done to file ' + fileName + '.')
}
