# Countries

Countries related, enums and data, such as currencies and languages.

## Installation

`npm i @bluejay/countries`

## Basic usage

```typescript
import { CountryCode, Countries, CurrencyCode, LanguageCode } from '@bluejay/countries';

CountryCode.US; // US
CurrencyCode.USD; // USD
LanguageCode.ENG; // ENG

Countries.get(CountryCode.AC).getMainCurrency().getDecimals(); // 2
```
