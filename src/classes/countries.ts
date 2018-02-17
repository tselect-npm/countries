import { Collection, ICollection } from '@bluejay/collection';
import { CountryCode } from '../constants/country-code';
import { CurrencyCode } from '../constants/currency-code';
import { LanguageCode } from '../constants/language-code';
import { countriesData } from '../data/countries';
import { ICountry } from '../interfaces/country';
import { ICurrency } from '../interfaces/currency';
import { Country } from './country';
import { currenciesData } from '../data/currencies';
import { Currency } from './currency';
import { ILanguage } from '../interfaces/language';
import { languagesData } from '../data/languages';
import { Language } from './language';

const countries: Map<CountryCode, ICountry> = new Map();
const currencies: Map<CurrencyCode, ICurrency> = new Map();
const languages: Map<LanguageCode, ILanguage> = new Map();

currenciesData.forEach(currencyData => {
  const code: CurrencyCode = currencyData.code as CurrencyCode;
  currencies.set(code, new Currency({
    code,
    decimals: currencyData.decimals,
    names: { [LanguageCode.ENG]: currencyData.name }
  }));
});

languagesData.forEach(languageData => {
  const code: LanguageCode = languageData.alpha3.toUpperCase() as LanguageCode;
  languages.set(code, new Language({
    code,
    names: { [LanguageCode.ENG]: languageData.name }
  }))
});

countriesData.forEach(countryData => {
  const code: CountryCode = countryData.alpha2 as CountryCode;
  if (countryData.currencies.length && countryData.languages.length) {
    countries.set(code, new Country({
      code,
      currencies: (countryData.currencies as string[]).map(currencyCode => currencies.get(currencyCode as CurrencyCode) as ICurrency),
      languages: (countryData.languages as string[]).map(languageCode => languages.get(languageCode.toUpperCase() as LanguageCode) as ILanguage),
      names: { [LanguageCode.ENG]: countryData.name }
    }));
  }
});

export abstract class Countries {
  public static get(countryCode: CountryCode): ICountry {
    return countries.get(countryCode) as ICountry;
  }
}