# @tselect/countries

[![npm](https://img.shields.io/npm/v/@tselect/countries.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/countries)
[![npm](https://img.shields.io/npm/dm/@tselect/countries.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/countries)
[![CI](https://img.shields.io/github/actions/workflow/status/tselect-npm/countries/ci.yml?branch=main&style=flat-square)](https://github.com/tselect-npm/countries/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/coverallsCoverage/github/tselect-npm/countries?branch=main&style=flat-square)](https://coveralls.io/github/tselect-npm/countries?branch=main)
[![license](https://img.shields.io/npm/l/@tselect/countries.svg?style=flat-square)](./LICENSE)

Country, currency and language codes as TypeScript enums, with the data behind them.

247 countries, 178 currencies and 185 languages. Zero runtime dependencies. Ships both ESM and CommonJS builds, with TypeScript types for each.

## Requirements

**Node 22 or newer** (`engines.node` is `>=22`) — every line still receiving security support. Each release is tested on 22, 24 and 26; the declared floor is the lowest version CI actually runs, not a guess.

## Installation

```bash
npm i @tselect/countries
```

```bash
pnpm add @tselect/countries
```

## Usage

```typescript
import { Countries, CountryCode, CurrencyCode, ISO6391LanguageCode } from '@tselect/countries';

CountryCode.US; // 'US'
CurrencyCode.USD; // 'USD'
ISO6391LanguageCode.EN; // 'en'

const france = Countries.get(CountryCode.FR);

france.getName(ISO6391LanguageCode.EN); // 'France'
france.getMainCurrency().getCode(); // 'EUR'
france.getMainCurrency().getDecimals(); // 2
france.getMainLanguage().getName(ISO6391LanguageCode.EN); // 'French'
france.hasLanguage(ISO6391LanguageCode.FR); // true
france.getCallingCodes(); // ['+33']
```

`require()` works too:

```javascript
const { Countries, CountryCode } = require('@tselect/countries');
```

## API

### Enums

| Enum | Members | Example |
| --- | --- | --- |
| `CountryCode` | 283 | `CountryCode.FR === 'FR'` — ISO 3166-1 alpha-2, **uppercase** |
| `CurrencyCode` | 178 | `CurrencyCode.EUR === 'EUR'` — ISO 4217, **uppercase** |
| `ISO6391LanguageCode` | 185 | `ISO6391LanguageCode.FR === 'fr'` — ISO 639-1, **lowercase** |
| `ISO6392BLanguageCode` | 185 | `ISO6392BLanguageCode.FRE === 'fre'` — ISO 639-2/B, **lowercase** |
| `ISO6392TLanguageCode` | 185 | `ISO6392TLanguageCode.FRA === 'fra'` — ISO 639-2/T, **lowercase** |
| `ISO6393LanguageCode` | 185 | `ISO6393LanguageCode.FRA === 'fra'` — ISO 639-3, **lowercase** |

Country and currency codes are uppercase; all four language codes are lowercase. The enum member names are uppercase in every case.

`CountryCode` carries 283 members, but only **247** have data behind them — the rest are reserved or historical assignments with no currency or no resolvable language. `Countries.get()` throws for those.

### `Countries.get(code: CountryCode): ICountry`

Returns the country, or throws `No data for country code <code>.` if the dataset has no entry for it.

```typescript
Countries.get(CountryCode.JP).getName(ISO6391LanguageCode.EN); // 'Japan'
Countries.get('ZZ' as CountryCode); // throws
```

### `Currencies.get(code: CurrencyCode): ICurrency`

Returns the currency, or throws `No data for currency code <code>.`. Every member of `CurrencyCode` resolves.

```typescript
Currencies.get(CurrencyCode.JPY).getDecimals(); // 0
```

### `ICountry`

```typescript
getCode(): CountryCode;
getName(languageCode: ISO6391LanguageCode): string | undefined;
getCallingCodes(): string[];
getCurrencies(): ICurrency[];
getMainCurrency(): ICurrency;
hasCurrency(code: CurrencyCode): boolean;
getLanguages(): ILanguage[];
getMainLanguage(): ILanguage;
hasLanguage(code: ISO6391LanguageCode): boolean;
```

`getMainCurrency()` and `getMainLanguage()` return the first entry of the corresponding list. Names are only available in English today, so `getName()` returns `undefined` for any other language.

```typescript
const ch = Countries.get(CountryCode.CH);

ch.getCurrencies().map((currency) => currency.getCode()); // ['CHF', 'CHE', 'CHW']
ch.hasCurrency(CurrencyCode.CHF); // true
ch.hasCurrency(CurrencyCode.EUR); // false
ch.getLanguages().map((language) => language.getISO6391Code()); // ['de', 'fr', 'it', 'rm']
```

### `ICurrency`

```typescript
getCode(): CurrencyCode;
getDecimals(): number;
getName(languageCode: ISO6391LanguageCode): string | undefined;
```

### `ILanguage`

```typescript
getISO6391Code(): ISO6391LanguageCode;
getISO6392BCode(): ISO6392BLanguageCode;
getISO6392TCode(): ISO6392TLanguageCode;
getISO6393Code(): ISO6393LanguageCode;
getName(languageCode: ISO6391LanguageCode): string | undefined;
```

```typescript
const french = Countries.get(CountryCode.FR).getMainLanguage();

french.getISO6392BCode(); // 'fre'
french.getISO6392TCode(); // 'fra'
french.getISO6393Code(); // 'fra'
```

## License

[MIT](./LICENSE) © Sylvain Estevez
