import { CountryCode } from '../constants/country-code';
import { CurrencyCode } from '../constants/currency-code';
import { LanguageCode } from '../constants/language-code';
import * as Lodash from 'lodash';
import { ICountry } from '../interfaces/country';
import { ICurrency } from '../interfaces/currency';
import { ILanguage } from '../interfaces/language';

export class Country implements ICountry {
  private code: CountryCode;
  private currencies: ICurrency[];
  private languages: ILanguage[];
  private names: Map<LanguageCode, string>;

  public constructor(options: { code: CountryCode, currencies: ICurrency[], languages: ILanguage[], names: { [languageCode in LanguageCode]?: string } }) {
    this.code = options.code;
    this.currencies = options.currencies;
    this.languages = options.languages;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<LanguageCode, string>;

    if (!this.currencies.length) {
      throw new Error(`A country requires at least one currency.`);
    }

    if (!this.languages.length) {
      throw new Error(`A country requires at least one language.`);
    }

    if (!this.names.get(LanguageCode.ENG)) {
      throw new Error(`A country requires an english name.`);
    }
  }

  public getCode() {
    return this.code;
  }

  public getCurrencies(): ICurrency[] {
    return this.currencies;
  }

  public getMainCurrency(): ICurrency {
    return this.currencies[0];
  }

  public hasCurrency(code: CurrencyCode): boolean {
    return !!this.currencies.find(currency => currency.getCode() === code);
  }

  public hasLanguage(code: LanguageCode): boolean {
    return !!this.languages.find(language => language.getCode() === code);
  }

  public getMainLanguage(): ILanguage {
    return this.languages[0];
  }

  public getLanguages(): ILanguage[] {
    return this.languages;
  }

  public getName(languageCode: LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}