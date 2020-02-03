import { TranslationEnum } from './TranslationEnum'
import { TranslationKeysBase } from '../../src/TranslationKeysBase'

export interface TranslationKeys extends TranslationKeysBase {
  readonly [TranslationEnum.Cat]: string,
  readonly [TranslationEnum.Dog]: string
}
