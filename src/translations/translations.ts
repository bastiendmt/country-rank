import type { Language, Translation } from '@/types';
import { FrenchTranslation } from './french';
import { EnglishTranslation } from './english';

const translationsContent: Record<'eng' | 'fra', Translation> = {
  eng: EnglishTranslation,
  fra: FrenchTranslation,
};

export const useTranslate = (langage: Language) => translationsContent[langage];
