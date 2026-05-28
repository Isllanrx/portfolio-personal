import { translations } from '../shared/lib/i18n/translations';

export const getDictionary = async (locale: 'pt' | 'en' | 'es') => {
  "use cache";
  return translations[locale] || translations['pt'];
};
