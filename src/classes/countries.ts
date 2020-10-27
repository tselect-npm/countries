import { CountryCode } from '../constants/country-code';
import { CurrencyCode } from '../constants/currency-code';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ISO6393LanguageCode } from '../constants/iso-6393-language-code';
import { countriesData } from '../data/countries';
import { currenciesData } from '../data/currencies';
import { ICountry } from '../interfaces/country';
import { ICurrency } from '../interfaces/currency';
import { Country } from './country';
import { Currency } from './currency';
import { Languages } from './languages';

const countries: Map<CountryCode, ICountry> = new Map();
const currencies: Map<CurrencyCode, ICurrency> = new Map();

currenciesData.forEach(currencyData => {
  const code: CurrencyCode = currencyData.code as CurrencyCode;
  currencies.set(code, new Currency({
    code,
    decimals: currencyData.decimals,
    names: { [ISO6391LanguageCode.EN]: currencyData.name }
  }));
});

countriesData.forEach(countryData => {
  const code: CountryCode = countryData.alpha2 as CountryCode;
  if (countryData.currencies.length && countryData.languages.length) {
    countries.set(code, new Country({
      code,
      currencies: (countryData.currencies as string[]).map(currencyCode => currencies.get(currencyCode as CurrencyCode) as ICurrency),
      languages: (countryData.languages as string[]).map(languageCode => Languages.getByISO6393Code(languageCode.toUpperCase() as ISO6393LanguageCode)),
      names: { [ISO6391LanguageCode.EN]: countryData.name },
      callingCodes: countryData.countryCallingCodes
    }));
  }
});

export abstract class Countries {
  public static get(countryCode: CountryCode): ICountry {
    return countries.get(countryCode) as ICountry;
  }
}
