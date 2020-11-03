import { CountryCode } from '../constants/country-code';
import { CurrencyCode } from '../constants/currency-code';
import { ISO6391LanguageCode } from '../constants/iso-6391-language-code';
import { ISO6393LanguageCode } from '../constants/iso-6393-language-code';
import { countriesData } from '../data/countries';
import { ICountry } from '../interfaces/country';
import { ICurrency } from '../interfaces/currency';
import { Country } from './country';
import { Currencies } from './currencies';
import { Languages } from './languages';

const countries: Map<CountryCode, ICountry> = new Map();

countriesData.forEach(countryData => {
  const code: CountryCode = countryData.alpha2 as CountryCode;
  if (countryData.currencies.length && countryData.languages.length) {
    countries.set(code, new Country({
      code,
      currencies: (countryData.currencies as string[]).map(currencyCode => Currencies.get(currencyCode as CurrencyCode) as ICurrency),
      languages: (countryData.languages as string[]).map(languageCode => Languages.getByISO6393Code(languageCode.toUpperCase() as ISO6393LanguageCode)),
      names: { [ISO6391LanguageCode.EN]: countryData.name },
      callingCodes: countryData.countryCallingCodes
    }));
  }
});

export abstract class Countries {
  public static get(countryCode: CountryCode): ICountry {
    const country = countries.get(countryCode);

    if (!country) {
      throw new Error(`No data for country code ${countryCode}.`);
    }

    return country as ICountry;
  }
}
