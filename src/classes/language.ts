import { ILanguage } from '../interfaces/language';
import { LanguageCode } from '../constants/language-code';
import * as Lodash from 'lodash';

export class Language implements ILanguage {
  private code: LanguageCode;
  private names: Map<LanguageCode, string>;

  public constructor(options: { code: LanguageCode, names: { [languageCode in LanguageCode]?: string } }) {
    this.code = options.code;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<LanguageCode, string>;

    if (!this.names.get(LanguageCode.ENG)) {
      throw new Error(`A language requires an english name.`);
    }
  }

  public getCode() {
    return this.code;
  }

  public getName(languageCode: LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}