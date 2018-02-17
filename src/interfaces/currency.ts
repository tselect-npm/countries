import { CurrencyCode } from '../constants/currency-code';
import { LanguageCode } from '../constants/language-code';

export interface ICurrency {
  getCode(): CurrencyCode;
  getDecimals(): number;
  getName(languageCode: LanguageCode): string | undefined;
}