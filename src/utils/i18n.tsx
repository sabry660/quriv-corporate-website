import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files directly from src/locales
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

export type LanguageCode = 'EN' | 'AR';

export interface TranslationKey {
  [key: string]: string | TranslationKey;
}

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation cache with direct imports
const translations: Record<LanguageCode, TranslationKey> = {
  EN: enTranslations as TranslationKey,
  AR: arTranslations as TranslationKey,
};

// Load translation file (synchronous since we import directly)
const loadTranslations = (lang: LanguageCode): TranslationKey => {
  console.log(`Loading translations for ${lang}`);
  return translations[lang] || {};
};

// Get nested translation value
const getNestedValue = (obj: TranslationKey, path: string): string => {
  return path.split('.').reduce((o: any, key) => o?.[key], obj) || path;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Load from localStorage or default to EN
    const saved = localStorage.getItem('quriv-language') as LanguageCode;
    return saved === 'AR' ? 'AR' : 'EN';
  });
  const [translationsData, setTranslationsData] = useState<TranslationKey>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load translations on mount and language change (synchronous)
  useEffect(() => {
    const data = loadTranslations(language);
    setTranslationsData(data);
    setIsLoaded(true);
  }, [language]);

  // Persist language to localStorage
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('quriv-language', lang);
  };

  // Update document direction
  useEffect(() => {
    const dir = language === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const t = (key: string): string => {
    if (!isLoaded) return key;
    return getNestedValue(translationsData, key);
  };

  const dir: 'ltr' | 'rtl' = language === 'AR' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
