import { ILanguage } from '../interfaces/language';
import * as Lodash from 'lodash';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../constants/iso-6393-language-code';

export class Language implements ILanguage {
  private iso6391Code: ISO6391LanguageCode;
  private iso6392BCode: ISO6392BLanguageCode;
  private iso6392TCode: ISO6392TLanguageCode;
  private iso6393Code: ISO6393LanguageCode;
  private names: Map<ISO6391LanguageCode, string>;

  public constructor(options: { iso6391Code: ISO6391LanguageCode, iso6392BCode: ISO6392BLanguageCode, iso6392TCode: ISO6392TLanguageCode, iso6393Code: ISO6393LanguageCode, names: { [languageCode in ISO6391LanguageCode]?: string } }) {
    this.iso6391Code = options.iso6391Code;
    this.iso6392BCode = options.iso6392BCode;
    this.iso6392TCode = options.iso6392TCode;
    this.iso6393Code = options.iso6393Code;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<ISO6391LanguageCode, string>;

    if (!this.names.get(ISO6391LanguageCode.EN)) {
      throw new Error(`A language requires an english name.`);
    }
  }

  public getISO6391Code() {
    return this.iso6391Code;
  }

  public getISO6392BCode() {
    return this.iso6392BCode;
  }

  public getISO6392TCode() {
    return this.iso6392TCode;
  }

  public getISO6393Code() {
    return this.iso6393Code;
  }

  public getName(languageCode: ISO6391LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}