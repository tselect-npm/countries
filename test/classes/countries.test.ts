import { expect } from 'chai';
import { Countries } from '../../src/classes/countries';
import { CountryCode } from '../../src/constants/country-code';
import { Country } from '../../src/classes/country';

describe('Countries', () => {
  describe('.get()', () => {
    it('should get a country by code', () => {
      expect(Countries.get(CountryCode.AC)).to.be.instanceOf(Country);
    });
  });
});