import type { CurrencyCode } from '../constants/currency-code';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { currenciesData } from '../data/currencies';
import type { ICurrency } from '../interfaces/currency';
import { Currency } from './currency';

const currencies: Map<CurrencyCode, ICurrency> = new Map();

currenciesData.forEach((currencyData) => {
  const code: CurrencyCode = currencyData.code as CurrencyCode;
  currencies.set(
    code,
    new Currency({
      code,
      decimals: currencyData.decimals,
      names: { [ISO6391LanguageCode.EN]: currencyData.name },
    }),
  );
});

// The static-only shape is the published API and what the README documents; turning it
// into a bare function would break every consumer for a stylistic preference.
// biome-ignore lint/complexity/noStaticOnlyClass: Currencies is a namespace over a fixed dataset.
export abstract class Currencies {
  public static get(currencyCode: CurrencyCode): ICurrency {
    const currency = currencies.get(currencyCode);

    if (!currency) {
      throw new Error(`No data for currency code ${currencyCode}.`);
    }

    return currency as ICurrency;
  }
}
