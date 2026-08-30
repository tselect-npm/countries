import { describe, expect, it } from 'vitest';
import { Countries } from '../../src/classes/countries';
import { Country } from '../../src/classes/country';
import { CountryCode } from '../../src/constants/country-code';

describe('Countries', () => {
  describe('.get()', () => {
    it('should get a country by code', () => {
      expect(Countries.get(CountryCode.AC)).toBeInstanceOf(Country);
    });
  });
});
