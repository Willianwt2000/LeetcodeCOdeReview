import type { resources, defaultNS } from './config';

// Simplified types that don't enforce strict key checking
// This allows flexible usage like t('footer.tagline') without namespace prefix
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    // Disable strict key checking for easier migration
    returnNull: false;
  }
}

// Namespace types for future expansion
export type Namespace = 'common' | 'home' | 'about' | 'industries' | 'forms' | 'legal';

// Language codes
export type SupportedLanguage = 'en' | 'es';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es'];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
};
