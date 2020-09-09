import { CountryCode } from '../constants/country-code';
import { ICurrency } from './currency';
import { ILanguage } from './language';
import { CurrencyCode } from '../constants/currency-code';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';

export interface ICountry {
  getCode(): CountryCode;
  getCurrencies(): ICurrency[];
  getLanguages(): ILanguage[];
  getMainCurrency(): ICurrency;
  getMainLanguage(): ILanguage;
  hasCurrency(code: CurrencyCode): boolean;
  hasLanguage(code: ISO6391LanguageCode): boolean;
  getName(languageCode: ISO6391LanguageCode): string | undefined;
  getCallingCodes(): string[];
}