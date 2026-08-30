import type { CountryCode } from '../constants/country-code';
import type { CurrencyCode } from '../constants/currency-code';
import type { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import type { ICurrency } from './currency';
import type { ILanguage } from './language';

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
