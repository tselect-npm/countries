import { CountryCode } from '../constants/country-code';
import { ICurrency } from './currency';
import { ILanguage } from './language';
import { CurrencyCode } from '../constants/currency-code';
import { LanguageCode } from '../constants/language-code';

export interface ICountry {
  getCode(): CountryCode;
  getCurrencies(): ICurrency[];
  getLanguages(): ILanguage[];
  getMainCurrency(): ICurrency;
  getMainLanguage(): ILanguage;
  hasCurrency(code: CurrencyCode): boolean;
  hasLanguage(code: LanguageCode): boolean;
  getName(languageCode: LanguageCode): string | undefined;
}