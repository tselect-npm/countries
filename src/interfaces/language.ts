import { LanguageCode } from '../constants/language-code';

export interface ILanguage {
  getCode(): LanguageCode;
  getName(languageCode: LanguageCode): string | undefined;
}