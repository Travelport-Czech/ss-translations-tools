import { TranslationEnum } from './fixtures/TranslationEnum'
import { csTranslation } from './fixtures/csTranslation'
import { enTranslation } from './fixtures/enTranslation'
import { translateExport } from '../src'
import * as fs from 'fs'
import * as path from 'path'

const fileName = path.join(__dirname, 'temp/translations.xlsx')
const translations = {
  cs: csTranslation,
  en: enTranslation
}

describe('export test', () => {
  it('should export to file and contain rows with cat and dog', () => {
    fs.existsSync(fileName) && fs.unlinkSync(fileName)

    translateExport(translations, TranslationEnum, fileName)
    const file = fs.readFileSync(fileName)
    expect(file.toString()).toContain(
      `<row r="1"><c r="A1" t="str"><v>key</v></c><c r="B1" t="str"><v>cs</v></c><c r="C1" t="str"><v>en</v></c></row><row r="2"><c r="A2" t="str"><v>Cat</v></c><c r="B2" t="str"><v>kočka</v></c><c r="C2" t="str"><v>cat</v></c></row><row r="3"><c r="A3" t="str"><v>Dog</v></c><c r="B3" t="str"><v>pes {?} {?}</v></c><c r="C3" t="str"><v>dog {?} {?}</v></c></row>`
    )
  })
})
