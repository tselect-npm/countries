import { describe, expect, it } from 'vitest';
import { Language } from '../../src/classes/language';
import { Languages } from '../../src/classes/languages';
import { ISO6391LanguageCode } from '../../src/constants/iso-6391-language-code';
import { ISO6392BLanguageCode } from '../../src/constants/iso-6392b-language-code';
import { ISO6392TLanguageCode } from '../../src/constants/iso-6392t-language-code';
import { ISO6393LanguageCode } from '../../src/constants/iso-6393-language-code';
import { languagesData } from '../../src/data/languages';

describe('Languages', () => {
  describe('.getByISO6391Code()', () => {
    it('should get a language by code', () => {
      expect(Languages.getByISO6391Code(ISO6391LanguageCode.FR)).toBeInstanceOf(Language);
    });

    it('should resolve every member of the enum', () => {
      const unresolved = Object.values(ISO6391LanguageCode).filter((code) => !Languages.getByISO6391Code(code));
      expect(unresolved).toEqual([]);
    });
  });

  describe('.getByISO6392BCode()', () => {
    it('should get a language by code', () => {
      expect(Languages.getByISO6392BCode(ISO6392BLanguageCode.FRE)).toBeInstanceOf(Language);
    });

    it('should resolve every member of the enum', () => {
      const unresolved = Object.values(ISO6392BLanguageCode).filter((code) => !Languages.getByISO6392BCode(code));
      expect(unresolved).toEqual([]);
    });
  });

  describe('.getByISO6392TCode()', () => {
    it('should get a language by code', () => {
      expect(Languages.getByISO6392TCode(ISO6392TLanguageCode.FRA)).toBeInstanceOf(Language);
    });

    it('should resolve every member of the enum', () => {
      const unresolved = Object.values(ISO6392TLanguageCode).filter((code) => !Languages.getByISO6392TCode(code));
      expect(unresolved).toEqual([]);
    });
  });

  describe('.getByISO6393Code()', () => {
    it('should get a language by code', () => {
      expect(Languages.getByISO6393Code(ISO6393LanguageCode.FRA)).toBeInstanceOf(Language);
    });

    it('should resolve every member of the enum', () => {
      const unresolved = Object.values(ISO6393LanguageCode).filter((code) => !Languages.getByISO6393Code(code));
      expect(unresolved).toEqual([]);
    });

    // 31 rows carried a macrolanguage annotation — `'ara + 30'` — in place of a
    // bare code, so the macrolanguages were never indexed under ISO 639-3.
    it('should index the macrolanguages under their bare code', () => {
      expect(Languages.getByISO6393Code(ISO6393LanguageCode.ARA).getName(ISO6391LanguageCode.EN)).toBe('Arabic');
      expect(Languages.getByISO6393Code(ISO6393LanguageCode.ZHO).getName(ISO6391LanguageCode.EN)).toBe('Chinese');
      expect(Languages.getByISO6393Code(ISO6393LanguageCode.QUE).getISO6391Code()).toBe(ISO6391LanguageCode.QU);
    });
  });

  // The four indexes were built from `code.toUpperCase()` while every enum
  // member is lowercase, so a lookup by any enum member missed and every
  // getter returned a string outside its own declared type.
  it('should key every index by the enum member, not an uppercased one', () => {
    const language = Languages.getByISO6391Code(ISO6391LanguageCode.FR);

    expect(language.getISO6391Code()).toBe(ISO6391LanguageCode.FR);
    expect(language.getISO6392BCode()).toBe(ISO6392BLanguageCode.FRE);
    expect(language.getISO6392TCode()).toBe(ISO6392TLanguageCode.FRA);
    expect(language.getISO6393Code()).toBe(ISO6393LanguageCode.FRA);
  });

  it('should return codes that are members of the enum they are typed as, for every language', () => {
    const members = (source: Record<string, string>) => new Set<string>(Object.values(source));
    const iso6391 = members(ISO6391LanguageCode);
    const iso6392B = members(ISO6392BLanguageCode);
    const iso6392T = members(ISO6392TLanguageCode);
    const iso6393 = members(ISO6393LanguageCode);

    const strays = Object.values(ISO6391LanguageCode)
      .map((code) => Languages.getByISO6391Code(code))
      .filter(
        (language) =>
          !iso6391.has(language.getISO6391Code()) ||
          !iso6392B.has(language.getISO6392BCode()) ||
          !iso6392T.has(language.getISO6392TCode()) ||
          !iso6393.has(language.getISO6393Code()),
      );

    expect(strays).toEqual([]);
  });

  it('should index every row of the dataset under all four codes', () => {
    expect(languagesData).toHaveLength(185);

    for (const row of languagesData) {
      const language = Languages.getByISO6391Code(row.iso6391 as ISO6391LanguageCode);

      expect(language.getName(ISO6391LanguageCode.EN)).toBe(row.name);
      expect(Languages.getByISO6392BCode(row.iso6392B as ISO6392BLanguageCode)).toBe(language);
      expect(Languages.getByISO6392TCode(row.iso6392T as ISO6392TLanguageCode)).toBe(language);
    }
  });
});
