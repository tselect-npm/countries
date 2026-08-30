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
