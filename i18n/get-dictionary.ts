import { translations } from '../shared/lib/i18n/translations';

export const getDictionary = async (locale: 'pt' | 'en' | 'es') => {
  return translations[locale] || translations['pt'];
};
