import { describe, expect, it } from 'vitest';
import { Language } from '../../src/classes/language';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../../src/constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../../src/constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../../src/constants/iso-6393-language-code';

const build = (overrides: Partial<ConstructorParameters<typeof Language>[0]> = {}) =>
  new Language({
    iso6391Code: ISO6391LanguageCode.FR,
    iso6392BCode: ISO6392BLanguageCode.FRE,
    iso6392TCode: ISO6392TLanguageCode.FRA,
    iso6393Code: ISO6393LanguageCode.FRA,
    names: { [ISO6391LanguageCode.EN]: 'French', [ISO6391LanguageCode.FR]: 'Français' },
    ...overrides,
  });

describe('Language', () => {
  describe('constructor', () => {
    it('should require an english name', () => {
      expect(() => build({ names: { [ISO6391LanguageCode.FR]: 'Français' } })).toThrow(
        'A language requires an english name.',
      );
    });
  });

  describe('accessors', () => {
    it('should expose all four codes', () => {
      const language = build();

      expect(language.getISO6391Code()).toBe(ISO6391LanguageCode.FR);
      expect(language.getISO6392BCode()).toBe(ISO6392BLanguageCode.FRE);
      expect(language.getISO6392TCode()).toBe(ISO6392TLanguageCode.FRA);
      expect(language.getISO6393Code()).toBe(ISO6393LanguageCode.FRA);
    });

    it('should return a name per language, and undefined for one it has no name in', () => {
      expect(build().getName(ISO6391LanguageCode.EN)).toBe('French');
      expect(build().getName(ISO6391LanguageCode.FR)).toBe('Français');
      expect(build().getName(ISO6391LanguageCode.DE)).toBeUndefined();
    });
  });
});
