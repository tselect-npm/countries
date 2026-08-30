import { describe, expect, it } from 'vitest';
import { Countries } from '../../src/classes/countries';
import { Country } from '../../src/classes/country';
import { Currencies } from '../../src/classes/currencies';
import { Languages } from '../../src/classes/languages';
import { CountryCode } from '../../src/constants/country-code';
import { CurrencyCode } from '../../src/constants/currency-code';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';

const eur = Currencies.get(CurrencyCode.EUR);
const usd = Currencies.get(CurrencyCode.USD);
const french = Languages.getByISO6391Code(ISO6391LanguageCode.FR);
const english = Languages.getByISO6391Code(ISO6391LanguageCode.EN);

const build = (overrides: Partial<ConstructorParameters<typeof Country>[0]> = {}) =>
  new Country({
    code: CountryCode.FR,
    callingCodes: ['+33'],
    currencies: [eur, usd],
    languages: [french, english],
    names: { [ISO6391LanguageCode.EN]: 'France', [ISO6391LanguageCode.FR]: 'France' },
    ...overrides,
  });

describe('Country', () => {
  describe('constructor', () => {
    it('should require at least one currency', () => {
      expect(() => build({ currencies: [] })).toThrow('A country requires at least one currency.');
    });

    it('should require at least one language', () => {
      expect(() => build({ languages: [] })).toThrow('A country requires at least one language.');
    });

    it('should require an english name', () => {
      expect(() => build({ names: { [ISO6391LanguageCode.FR]: 'France' } })).toThrow(
        'A country requires an english name.',
      );
    });

    it('should accept a name map with no entries at all as a missing english name', () => {
      expect(() => build({ names: {} })).toThrow('A country requires an english name.');
    });
  });

  describe('accessors', () => {
    it('should expose the code', () => {
      expect(build().getCode()).toBe(CountryCode.FR);
    });

    it('should expose the calling codes', () => {
      expect(build().getCallingCodes()).toEqual(['+33']);
    });

    it('should expose every currency, main currency first', () => {
      expect(build().getCurrencies()).toEqual([eur, usd]);
      expect(build().getMainCurrency()).toBe(eur);
    });

    it('should expose every language, main language first', () => {
      expect(build().getLanguages()).toEqual([french, english]);
      expect(build().getMainLanguage()).toBe(french);
    });

    it('should answer hasCurrency()', () => {
      expect(build().hasCurrency(CurrencyCode.USD)).toBe(true);
      expect(build().hasCurrency(CurrencyCode.GBP)).toBe(false);
    });

    it('should answer hasLanguage()', () => {
      expect(build().hasLanguage(ISO6391LanguageCode.EN)).toBe(true);
      expect(build().hasLanguage(ISO6391LanguageCode.DE)).toBe(false);
    });

    it('should return a name per language, and undefined for one it has no name in', () => {
      expect(build().getName(ISO6391LanguageCode.EN)).toBe('France');
      expect(build().getName(ISO6391LanguageCode.DE)).toBeUndefined();
    });
  });

  it('should be what Countries hands back', () => {
    const france = Countries.get(CountryCode.FR);

    expect(france.getCode()).toBe(CountryCode.FR);
    expect(france.getName(ISO6391LanguageCode.EN)).toBe('France');
    expect(france.getMainCurrency().getCode()).toBe(CurrencyCode.EUR);
  });
});
