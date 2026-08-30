import { describe, expect, it } from 'vitest';
import { Countries } from '../src/classes/countries';
import { Currencies } from '../src/classes/currencies';
import { CountryCode } from '../src/constants/country-code';
import { CurrencyCode } from '../src/constants/currency-code';
import { ISO6391LanguageCode } from '../src/constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../src/constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../src/constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../src/constants/iso-6393-language-code';

describe('README', () => {
  it('Usage block', () => {
    expect(CountryCode.US).toBe('US');
    expect(CurrencyCode.USD).toBe('USD');
    expect(ISO6391LanguageCode.EN).toBe('en');
    const france = Countries.get(CountryCode.FR);
    expect(france.getName(ISO6391LanguageCode.EN)).toBe('France');
    expect(france.getMainCurrency().getCode()).toBe('EUR');
    expect(france.getMainCurrency().getDecimals()).toBe(2);
    expect(france.getMainLanguage().getName(ISO6391LanguageCode.EN)).toBe('French');
    expect(france.hasLanguage(ISO6391LanguageCode.FR)).toBe(true);
    expect(france.getCallingCodes()).toEqual(['+33']);
  });

  it('enum table', () => {
    expect(CountryCode.FR).toBe('FR');
    expect(CurrencyCode.EUR).toBe('EUR');
    expect(ISO6391LanguageCode.FR).toBe('fr');
    expect(ISO6392BLanguageCode.FRE).toBe('fre');
    expect(ISO6392TLanguageCode.FRA).toBe('fra');
    expect(ISO6393LanguageCode.FRA).toBe('fra');
    expect(Object.keys(CountryCode)).toHaveLength(283);
    expect(Object.keys(CurrencyCode)).toHaveLength(178);
    expect(Object.keys(ISO6391LanguageCode)).toHaveLength(185);
    expect(Object.keys(ISO6392BLanguageCode)).toHaveLength(185);
    expect(Object.keys(ISO6392TLanguageCode)).toHaveLength(185);
    expect(Object.keys(ISO6393LanguageCode)).toHaveLength(185);
    expect(Object.values(CountryCode).every((c) => c === c.toUpperCase())).toBe(true);
    expect(Object.values(CurrencyCode).every((c) => c === c.toUpperCase())).toBe(true);
    expect(Object.values(ISO6391LanguageCode).every((c) => c === c.toLowerCase())).toBe(true);
    expect(Object.values(ISO6392BLanguageCode).every((c) => c === c.toLowerCase())).toBe(true);
    expect(Object.values(ISO6392TLanguageCode).every((c) => c === c.toLowerCase())).toBe(true);
    expect(Object.values(ISO6393LanguageCode).every((c) => c === c.toLowerCase())).toBe(true);
  });

  it('Countries.get()', () => {
    expect(Countries.get(CountryCode.JP).getName(ISO6391LanguageCode.EN)).toBe('Japan');
    expect(() => Countries.get('ZZ' as CountryCode)).toThrow();
  });

  it('Currencies.get()', () => {
    expect(Currencies.get(CurrencyCode.JPY).getDecimals()).toBe(0);
  });

  it('ICountry block', () => {
    const ch = Countries.get(CountryCode.CH);
    expect(ch.getCurrencies().map((c) => c.getCode())).toEqual(['CHF', 'CHE', 'CHW']);
    expect(ch.hasCurrency(CurrencyCode.CHF)).toBe(true);
    expect(ch.hasCurrency(CurrencyCode.EUR)).toBe(false);
    expect(ch.getLanguages().map((l) => l.getISO6391Code())).toEqual(['de', 'fr', 'it', 'rm']);
  });

  it('ILanguage block', () => {
    const french = Countries.get(CountryCode.FR).getMainLanguage();
    expect(french.getISO6392BCode()).toBe('fre');
    expect(french.getISO6392TCode()).toBe('fra');
    expect(french.getISO6393Code()).toBe('fra');
  });
});
