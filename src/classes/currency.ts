import { CurrencyCode } from '../constants/currency-code';
import { LanguageCode } from '../constants/language-code';
import * as Lodash from 'lodash';
import { ICurrency } from '../interfaces/currency';

export class Currency implements ICurrency {
  private code: CurrencyCode;
  private decimals: number;
  private names: Map<LanguageCode, string>;

  public constructor(options: { code: CurrencyCode, decimals: number, names: { [languageCode in LanguageCode]?: string } }) {
    this.code = options.code;
    this.decimals = options.decimals;
    this.names = new Map(Lodash.toPairs(options.names)) as Map<LanguageCode, string>;

    if (this.decimals < 0) {
      throw new Error(`A currency decimals ust be >= 0.`);
    }

    if (!this.names.get(LanguageCode.ENG)) {
      throw new Error(`A currency requires an english name.`);
    }
  }

  public getCode() {
    return this.code;
  }

  public getDecimals(): number {
    return this.decimals;
  }

  public getName(languageCode: LanguageCode): string | undefined {
    return this.names.get(languageCode);
  }
}