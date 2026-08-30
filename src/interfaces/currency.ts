import type { CurrencyCode } from '../constants/currency-code';
import type { ISO6391LanguageCode } from '../constants/iso-6391-language-code';

export interface ICurrency {
  getCode(): CurrencyCode;
  getDecimals(): number;
  getName(languageCode: ISO6391LanguageCode): string | undefined;
}
