/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, translations, Translations } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  t: Translations;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('scanx_lang');
    if (saved === 'en' || saved === 'ne') {
      return saved as LanguageCode;
    }
    // Default to Nepali for localized impact, fallback to English if browser is EN
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ne') ? 'ne' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('scanx_lang', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    t: translations[language],
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
