import { describe, expect, it } from 'vitest';
import { Currencies } from '../../src/classes/currencies';
import { Currency } from '../../src/classes/currency';
import { CurrencyCode } from '../../src/constants/currency-code';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';
import { currenciesData } from '../../src/data/currencies';

describe('Currencies', () => {
  describe('.get()', () => {
    it('should get a currency by code', () => {
      expect(Currencies.get(CurrencyCode.EUR)).toBeInstanceOf(Currency);
    });

    it('should throw for a code the dataset has no entry for', () => {
      expect(() => Currencies.get('ZZZ' as CurrencyCode)).toThrow('No data for currency code ZZZ.');
    });

    it('should return the same instance on every call', () => {
      expect(Currencies.get(CurrencyCode.EUR)).toBe(Currencies.get(CurrencyCode.EUR));
    });

    it('should resolve every member of the enum', () => {
      const unresolved = Object.values(CurrencyCode).filter((code) => {
        try {
          Currencies.get(code);
          return false;
        } catch {
          return true;
        }
      });

      expect(unresolved).toEqual([]);
    });
  });

  describe('dataset integrity', () => {
    it('should give every currency a code, non-negative decimals and an english name', () => {
      expect(currenciesData).toHaveLength(178);

      for (const row of currenciesData) {
        const currency = Currencies.get(row.code as CurrencyCode);

        expect(currency.getCode()).toBe(row.code);
        expect(currency.getDecimals()).toBe(row.decimals);
        expect(currency.getDecimals()).toBeGreaterThanOrEqual(0);
        expect(currency.getName(ISO6391LanguageCode.EN)).toBe(row.name);
      }
    });
  });
});
