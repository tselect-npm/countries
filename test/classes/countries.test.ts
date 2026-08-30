import { describe, expect, it } from 'vitest';
import { Countries } from '../../src/classes/countries';
import { Country } from '../../src/classes/country';
import { CountryCode } from '../../src/constants/country-code';
import { CurrencyCode } from '../../src/constants/currency-code';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';

/** Every country code the dataset actually carries data for. */
const resolvable = Object.values(CountryCode).filter((code) => {
  try {
    Countries.get(code);
    return true;
  } catch {
    return false;
  }
});

describe('Countries', () => {
  describe('.get()', () => {
    it('should get a country by code', () => {
      expect(Countries.get(CountryCode.AC)).toBeInstanceOf(Country);
    });

    it('should throw for a code the dataset has no entry for', () => {
      expect(() => Countries.get('ZZ' as CountryCode)).toThrow('No data for country code ZZ.');
    });

    it('should return the same instance on every call', () => {
      expect(Countries.get(CountryCode.FR)).toBe(Countries.get(CountryCode.FR));
    });
  });

  // `Languages` indexed macrolanguages under an annotated code (`'ara + 30'`),
  // so 51 of the 248 countries with data ended up with `undefined` in their
  // language list: `getMainLanguage()` returned `undefined` and `hasLanguage()`
  // threw a TypeError reading `getISO6391Code` of undefined.
  describe('language resolution', () => {
    it('should never put undefined in a country language list', () => {
      const broken = resolvable.filter((code) => Countries.get(code).getLanguages().some((language) => !language));
      expect(broken).toEqual([]);
    });

    it('should resolve the macrolanguage countries that used to be empty', () => {
      const cases: [CountryCode, ISO6391LanguageCode][] = [
        [CountryCode.SA, ISO6391LanguageCode.AR],
        [CountryCode.CN, ISO6391LanguageCode.ZH],
        [CountryCode.MY, ISO6391LanguageCode.MS],
        [CountryCode.NO, ISO6391LanguageCode.NO],
        [CountryCode.IR, ISO6391LanguageCode.FA],
        [CountryCode.AF, ISO6391LanguageCode.PS],
      ];

      for (const [country, language] of cases) {
        expect(Countries.get(country).getMainLanguage().getISO6391Code()).toBe(language);
        expect(Countries.get(country).hasLanguage(language)).toBe(true);
      }
    });

    it('should answer hasLanguage() truthfully rather than always false', () => {
      const answering = resolvable.filter((code) => {
        const country = Countries.get(code);
        return country.hasLanguage(country.getMainLanguage().getISO6391Code());
      });

      expect(answering).toHaveLength(resolvable.length);
    });
  });

  describe('dataset integrity', () => {
    it('should expose 247 countries', () => {
      expect(resolvable).toHaveLength(247);
    });

    it('should give every country a currency, a language and an english name', () => {
      for (const code of resolvable) {
        const country = Countries.get(code);

        expect(country.getCode()).toBe(code);
        expect(country.getCurrencies().length).toBeGreaterThan(0);
        expect(country.getLanguages().length).toBeGreaterThan(0);
        expect(country.getName(ISO6391LanguageCode.EN)).toBeTruthy();
        expect(country.hasCurrency(country.getMainCurrency().getCode())).toBe(true);
      }
    });

    it('should drop a country whose only language cannot be resolved', () => {
      // Montenegro's sole listed language is `mot` (Barí), which has no ISO 639-1
      // code and so no row in the language dataset.
      expect(() => Countries.get(CountryCode.ME)).toThrow('No data for country code ME.');
    });

    it('should keep the resolvable languages of a country that also lists an unresolvable one', () => {
      // Kosovo lists sqi, srp, bos, tur and rom; `rom` (Romany) has no ISO 639-1 code.
      const kosovo = Countries.get('XK' as CountryCode);

      expect(kosovo.getLanguages()).toHaveLength(4);
      expect(kosovo.hasLanguage(ISO6391LanguageCode.SQ)).toBe(true);
    });

    it('should read the documented example', () => {
      expect(Countries.get(CountryCode.AC).getMainCurrency().getDecimals()).toBe(2);
      expect(Countries.get(CountryCode.FR).getMainCurrency().getCode()).toBe(CurrencyCode.EUR);
      expect(Countries.get(CountryCode.FR).getCallingCodes()).toEqual(['+33']);
    });
  });
});
