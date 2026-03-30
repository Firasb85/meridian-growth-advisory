// Meridian Growth Advisory - Global Application Context

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  AppState,
  LanguageCode,
  Language,
  ContactRequest,
  CRMEntry,
  ContentOverrides,
  LanguageTranslationOverrides,
} from '@/types/types';

interface AppContextType extends AppState {
  setLanguage: (code: LanguageCode) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addRequest: (request: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: ContactRequest['status']) => void;
  deleteRequest: (id: string) => void;
  convertRequestToCRM: (requestId: string) => void;
  addCRMEntry: (entry: Omit<CRMEntry, 'id' | 'createdAt'>) => void;
  updateCRMEntry: (id: string, entry: Partial<CRMEntry>) => void;
  deleteCRMEntry: (id: string) => void;
  updateContentOverrides: (overrides: Partial<ContentOverrides>) => void;
  updateLanguageTranslation: (languageCode: string, translations: Record<string, string>) => void;
  addLanguage: (language: Omit<Language, 'enabled' | 'default'>) => void;
  updateLanguage: (code: LanguageCode, updates: Partial<Language>) => void;
  deleteLanguage: (code: LanguageCode) => void;
  toggleLanguageEnabled: (code: LanguageCode) => void;
  setDefaultLanguage: (code: LanguageCode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialLanguages: Language[] = [
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    enabled: true,
    default: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    enabled: true,
    default: false,
  },
  {
    code: 'kr',
    name: 'Kurdish Sorani',
    nativeName: 'کوردی سۆرانی',
    direction: 'rtl',
    enabled: true,
    default: false,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ar');
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [crmEntries, setCrmEntries] = useState<CRMEntry[]>([]);
  const [contentOverrides, setContentOverrides] = useState<ContentOverrides>({});
  const [languageTranslationOverrides, setLanguageTranslationOverrides] = useState<LanguageTranslationOverrides>({});

  const setLanguage = useCallback((code: LanguageCode) => {
    const language = languages.find(lang => lang.code === code && lang.enabled);
    if (language) {
      setCurrentLanguage(code);
      document.documentElement.setAttribute('dir', language.direction);
      document.documentElement.setAttribute('lang', code);
    }
  }, [languages]);

  const login = useCallback((username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const addRequest = useCallback((request: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: ContactRequest = {
      ...request,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'new',
      createdAt: new Date(),
    };
    setRequests(prev => [newRequest, ...prev]);
  }, []);

  const updateRequestStatus = useCallback((id: string, status: ContactRequest['status']) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  }, []);

  const deleteRequest = useCallback((id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  }, []);

  const convertRequestToCRM = useCallback((requestId: string) => {
    const request = requests.find(req => req.id === requestId);
    if (request) {
      const crmEntry: CRMEntry = {
        id: `crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fullName: request.fullName,
        company: request.company,
        email: request.email,
        phone: request.phone,
        notes: `Converted from request on ${new Date().toLocaleDateString()}. Original message: ${request.message || 'N/A'}`,
        createdAt: new Date(),
      };
      setCrmEntries(prev => [crmEntry, ...prev]);
    }
  }, [requests]);

  const addCRMEntry = useCallback((entry: Omit<CRMEntry, 'id' | 'createdAt'>) => {
    const newEntry: CRMEntry = {
      ...entry,
      id: `crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    setCrmEntries(prev => [newEntry, ...prev]);
  }, []);

  const updateCRMEntry = useCallback((id: string, entry: Partial<CRMEntry>) => {
    setCrmEntries(prev => prev.map(crm => crm.id === id ? { ...crm, ...entry } : crm));
  }, []);

  const deleteCRMEntry = useCallback((id: string) => {
    setCrmEntries(prev => prev.filter(crm => crm.id !== id));
  }, []);

  const updateContentOverrides = useCallback((overrides: Partial<ContentOverrides>) => {
    setContentOverrides(prev => ({ ...prev, ...overrides }));
  }, []);

  const updateLanguageTranslation = useCallback((languageCode: string, translations: Record<string, string>) => {
    setLanguageTranslationOverrides(prev => ({
      ...prev,
      [languageCode]: {
        ...(prev[languageCode] || {}),
        ...translations,
      },
    }));
  }, []);

  const addLanguage = useCallback((language: Omit<Language, 'enabled' | 'default'>) => {
    const newLanguage: Language = {
      ...language,
      enabled: true,
      default: false,
    };
    setLanguages(prev => [...prev, newLanguage]);
  }, []);

  const updateLanguage = useCallback((code: LanguageCode, updates: Partial<Language>) => {
    setLanguages(prev => prev.map(lang => lang.code === code ? { ...lang, ...updates } : lang));
  }, []);

  const deleteLanguage = useCallback((code: LanguageCode) => {
    const language = languages.find(lang => lang.code === code);
    if (language?.default) {
      return; // Cannot delete default language
    }
    setLanguages(prev => prev.filter(lang => lang.code !== code));
  }, [languages]);

  const toggleLanguageEnabled = useCallback((code: LanguageCode) => {
    const language = languages.find(lang => lang.code === code);
    if (language?.default) {
      return; // Cannot disable default language
    }
    setLanguages(prev => prev.map(lang => 
      lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
    ));
  }, [languages]);

  const setDefaultLanguage = useCallback((code: LanguageCode) => {
    setLanguages(prev => prev.map(lang => ({
      ...lang,
      default: lang.code === code,
    })));
    setLanguage(code);
  }, [setLanguage]);

  const value: AppContextType = {
    currentLanguage,
    languages,
    isAuthenticated,
    requests,
    crmEntries,
    contentOverrides,
    languageTranslationOverrides,
    setLanguage,
    login,
    logout,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    convertRequestToCRM,
    addCRMEntry,
    updateCRMEntry,
    deleteCRMEntry,
    updateContentOverrides,
    updateLanguageTranslation,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    toggleLanguageEnabled,
    setDefaultLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
