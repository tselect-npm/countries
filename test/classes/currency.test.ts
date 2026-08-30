import { describe, expect, it } from 'vitest';
import { Currency } from '../../src/classes/currency';
import { CurrencyCode } from '../../src/constants/currency-code';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';

const build = (overrides: Partial<ConstructorParameters<typeof Currency>[0]> = {}) =>
  new Currency({
    code: CurrencyCode.EUR,
    decimals: 2,
    names: { [ISO6391LanguageCode.EN]: 'Euro', [ISO6391LanguageCode.FR]: 'Euro' },
    ...overrides,
  });

describe('Currency', () => {
  describe('constructor', () => {
    it('should reject negative decimals', () => {
      expect(() => build({ decimals: -1 })).toThrow('A currency decimals must be >= 0.');
    });

    it('should accept zero decimals', () => {
      expect(build({ decimals: 0 }).getDecimals()).toBe(0);
    });

    it('should require an english name', () => {
      expect(() => build({ names: { [ISO6391LanguageCode.FR]: 'Euro' } })).toThrow(
        'A currency requires an english name.',
      );
    });
  });

  describe('accessors', () => {
    it('should expose the code', () => {
      expect(build().getCode()).toBe(CurrencyCode.EUR);
    });

    it('should expose the decimals', () => {
      expect(build().getDecimals()).toBe(2);
    });

    it('should return a name per language, and undefined for one it has no name in', () => {
      expect(build().getName(ISO6391LanguageCode.EN)).toBe('Euro');
      expect(build().getName(ISO6391LanguageCode.DE)).toBeUndefined();
    });
  });
});
