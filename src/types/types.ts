// Meridian Growth Advisory - Type Definitions

export type LanguageCode = 'ar' | 'en' | 'kr' | string;
export type Direction = 'rtl' | 'ltr';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: Direction;
  enabled: boolean;
  default: boolean;
}

export interface Translation {
  [key: string]: string | Translation | string[];
}

export interface Translations {
  [languageCode: string]: Translation;
}

export interface ContactRequest {
  id: string;
  fullName: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  files?: File[];
  status: 'new' | 'in-progress' | 'done';
  createdAt: Date;
}

export interface CRMEntry {
  id: string;
  fullName: string;
  company?: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: Date;
}

export interface ContentOverrides {
  logoText?: string;
  tagline?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  ctaTitle?: string;
  ctaSubtext?: string;
  ctaButton?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  footerDescription?: string;
  // Outcomes section
  outcomesLabel?: string;
  outcomesHeading?: string;
  // Industries section
  industriesLabel?: string;
  industriesHeading?: string;
  // Services section
  servicesLabel?: string;
  servicesHeading?: string;
  servicesCtaText?: string;
  servicesCtaButton?: string;
  // About section
  aboutLabel?: string;
  aboutHeading?: string;
  aboutHeadingEm?: string;
  aboutBody1?: string;
  aboutBody2?: string;
  aboutBody3?: string;
  // Contact section
  contactHeading?: string;
  contactInfoTitle?: string;
  contactInfoSubtitle?: string;
}

export interface LanguageTranslationOverrides {
  [languageCode: string]: {
    [key: string]: string;
  };
}

export interface AppState {
  currentLanguage: LanguageCode;
  languages: Language[];
  isAuthenticated: boolean;
  requests: ContactRequest[];
  crmEntries: CRMEntry[];
  contentOverrides: ContentOverrides;
  languageTranslationOverrides: LanguageTranslationOverrides;
}
