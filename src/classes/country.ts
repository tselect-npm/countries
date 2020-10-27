import * as Lodash from 'lodash';
import { CountryCode } from '../constants/country-code';
import { CurrencyCode } from '../constants/currency-code';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ICountry } from '../interfaces/country';
import { ICurrency } from '../interfaces/currency';
import { ILanguage } from '../interfaces/language';

export class Country implements ICountry {
  private readonly code: CountryCode;
  private readonly currencies: ICurrency[];
  private readonly languages: ILanguage[];
  private readonly names: Map<ISO6391LanguageCode, string>;
  private readonly callingCodes: string[];

  public constructor(options: { code: CountryCode, callingCodes: string[], currencies: ICurrency[], languages: ILanguage[], names: { [languageCode in ISO6391LanguageCode]?: string } }) {
    this.code = options.code;
    this.currencies = options.currencies;
    this.languages = options.languages;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<ISO6391LanguageCode, string>;
    this.callingCodes = options.callingCodes;

    if (!this.currencies.length) {
      throw new Error(`A country requires at least one currency.`);
    }

    if (!this.languages.length) {
      throw new Error(`A country requires at least one language.`);
    }

    if (!this.names.get(ISO6391LanguageCode.EN)) {
      throw new Error(`A country requires an english name.`);
    }
  }

  public getCode() {
    return this.code;
  }

  public getCallingCodes(): string[] {
    return this.callingCodes;
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

  public hasLanguage(code: ISO6391LanguageCode): boolean {
    return !!this.languages.find(language => language.getISO6391Code() === code);
  }

  public getMainLanguage(): ILanguage {
    return this.languages[0];
  }

  public getLanguages(): ILanguage[] {
    return this.languages;
  }

  public getName(languageCode: ISO6391LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}
