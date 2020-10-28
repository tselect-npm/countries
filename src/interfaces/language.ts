import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../constants/iso-6393-language-code';

export interface ILanguage {
  getName(languageCode: ISO6391LanguageCode): string | undefined;
  getISO6391Code(): ISO6391LanguageCode;
  getISO6392TCode(): ISO6392TLanguageCode;
  getISO6392BCode(): ISO6392BLanguageCode;
  getISO6393Code(): ISO6393LanguageCode;
}
