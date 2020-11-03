import { expect } from 'chai';
import { Currencies } from '../../src/classes/currencies';
import { Currency } from '../../src/classes/currency';
import { CurrencyCode } from '../../src/constants/currency-code';

describe('Currencies', () => {
  describe('.get()', () => {
    it('should get a currency by code', () => {
      expect(Currencies.get(CurrencyCode.EUR)).to.be.instanceOf(Currency);
    });
  });
});