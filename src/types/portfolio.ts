export type Language = 'en' | 'bn';

export type ProjectCategory =
  | 'all'
  | 'social-media-marketing'
  | 'paid-ads'
  | 'seo';

export interface BilingualText {
  en: string;
  bn: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  iconName: 'share2' | 'megaphone' | 'search' | 'target' | 'calendarCheck';
  title: BilingualText;
  description: BilingualText;
  focusPoints: {
    en: string[];
    bn: string[];
  };
}

export interface ProjectItem {
  id: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: BilingualText;
  projectTypeLabel: BilingualText;
  title: BilingualText;
  shortDescription: BilingualText;
  image: string;
  imageAlt: BilingualText;
  aspectClass: string;
  overview: BilingualText;
  scopeDeliverables: {
    en: string[];
    bn: string[];
  };
  disclaimer: BilingualText;
}

export interface ProcessStep {
  number: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
}

export interface SkillGroup {
  id: string;
  title: BilingualText;
  items: BilingualText[];
}

export interface SocialChannel {
  id: string;
  name: string;
  url: string | null;
  note: BilingualText;
}
