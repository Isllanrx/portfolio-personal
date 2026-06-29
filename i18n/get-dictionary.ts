import { translations } from '../shared/lib/i18n/translations';

export const getDictionary = async (locale: 'pt' | 'en' | 'es') => {
  "use cache";
  return translations[locale] || translations['pt'];
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
