import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../constants/iso-6393-language-code';
import { languagesData } from '../data/languages';
import { ILanguage } from '../interfaces/language';
import { Language } from './language';

const languagesByISO6391Code: Map<ISO6391LanguageCode, ILanguage> = new Map();
const languagesByISO6392BCode: Map<ISO6392BLanguageCode, ILanguage> = new Map();
const languagesByISO6392TCode: Map<ISO6392TLanguageCode, ILanguage> = new Map();
const languagesByISO6393Code: Map<ISO6393LanguageCode, ILanguage> = new Map();

languagesData.forEach(languageData => {
  const iso6391Code: ISO6391LanguageCode = languageData.iso6391.toUpperCase() as ISO6391LanguageCode;
  const iso6392BCode: ISO6392BLanguageCode = languageData.iso6392B.toUpperCase() as ISO6392BLanguageCode;
  const iso6392TCode: ISO6392TLanguageCode = languageData.iso6392T.toUpperCase() as ISO6392TLanguageCode;
  const iso6393Code: ISO6393LanguageCode = languageData.iso6393.toUpperCase() as ISO6393LanguageCode;

  const language = new Language({
    iso6391Code,
    iso6392BCode,
    iso6392TCode,
    iso6393Code,
    names: { [ISO6391LanguageCode.EN]: languageData.name }
  });

  languagesByISO6391Code.set(iso6391Code, language);
  languagesByISO6392BCode.set(iso6392BCode, language);
  languagesByISO6392TCode.set(iso6392TCode, language);

  if (iso6393Code) {
    languagesByISO6393Code.set(iso6393Code, language);
  }
});

export abstract class Languages {
  public static getByISO6391Code(code: ISO6391LanguageCode): ILanguage {
    return languagesByISO6391Code.get(code) as ILanguage;
  }

  public static getByISO6392BCode(code: ISO6392BLanguageCode): ILanguage {
    return languagesByISO6392BCode.get(code) as ILanguage;
  }

  public static getByISO6392TCode(code: ISO6392TLanguageCode): ILanguage {
    return languagesByISO6392TCode.get(code) as ILanguage;
  }

  public static getByISO6393Code(code: ISO6393LanguageCode): ILanguage {
    return languagesByISO6393Code.get(code) as ILanguage;
  }
}
