# Countries

[![npm](https://img.shields.io/npm/v/@tselect/countries.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/countries)
 [![npm](https://img.shields.io/npm/dm/@tselect/countries.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/countries)
[![npm](https://img.shields.io/npm/l/@tselect/countries.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/countries)

Countries related, enums and data, such as currencies and languages.

## Installation

`npm i @tselect/countries`

## Basic usage

```typescript
import { CountryCode, Countries, CurrencyCode, ISO6391LanguageCode } from '@tselect/countries';

CountryCode.US; // US
CurrencyCode.USD; // USD
ISO6391LanguageCode.ENG; // EN

Countries.get(CountryCode.AC).getMainCurrency().getDecimals(); // 2
```
