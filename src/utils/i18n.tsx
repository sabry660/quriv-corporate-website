import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  t: (key: string, variables?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
  isTransitioning: boolean;
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

// Get nested translation value with variable interpolation support
const getNestedValue = (obj: TranslationKey, path: string, variables?: Record<string, string | number>): string => {
  let value = path.split('.').reduce((o: any, key) => o?.[key], obj) || path;
  
  // Replace variables in the format {{variableName}}
  if (variables && typeof value === 'string') {
    value = value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? String(variables[key]) : match;
    });
  }
  
  return value;
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load translations on mount and language change (synchronous)
  useEffect(() => {
    const data = loadTranslations(language);
    setTranslationsData(data);
    setIsLoaded(true);
  }, [language]);

  // Persist language to localStorage with transition animation
  const setLanguage = (lang: LanguageCode) => {
    if (lang === language) return;
    
    // Start transition animation
    setIsTransitioning(true);
    
    // Add transition class to body for section-by-section animation
    document.body.classList.add('language-transition');
    
    // Update language after short delay for visual effect
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem('quriv-language', lang);
      
      // Remove transition class after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove('language-transition');
      }, 800);
    }, 300);
  };

  // Update document direction and meta tags
  useEffect(() => {
    const dir = language === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language.toLowerCase();
    
    // Update page title and meta tags
    const metaTranslations = translations[language].meta as any;
    if (metaTranslations) {
      document.title = metaTranslations.title || 'Quriv Technologies';
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metaTranslations.description || '');
      }
      
      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', metaTranslations.ogTitle || metaTranslations.title || '');
      }
      
      // Update Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', metaTranslations.ogDescription || metaTranslations.description || '');
      }
    }
  }, [language]);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    if (!isLoaded) return key;
    return getNestedValue(translationsData, key, variables);
  };

  const dir: 'ltr' | 'rtl' = language === 'AR' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir, isTransitioning }}>
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
