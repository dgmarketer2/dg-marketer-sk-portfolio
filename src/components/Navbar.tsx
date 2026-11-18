import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PORTFOLIO_CONFIG, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
}

export function Navbar({ language, onLanguageChange, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(148,163,184,0.18)] bg-[#07111F]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Brand Logo & Single-line Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="inline-flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-[#F5F8FC] whitespace-nowrap shrink-0 sm:text-lg"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-7 w-7 shrink-0"
          >
            <defs>
              <linearGradient id="dgLogoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#102238" />
                <stop offset="100%" stopColor="#07111F" />
              </linearGradient>
              <linearGradient id="dgLogoStroke" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#dgLogoBg)" stroke="url(#dgLogoStroke)" strokeWidth="2.5" />
            <path
              d="M15 21H23.5C29.8 21 34 25.3 34 32C34 38.7 29.8 43 23.5 43H15V21Z"
              stroke="#F5F8FC"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <path
              d="M48.5 25.5C47 22.3 43.8 20.5 40.2 20.5C34.5 20.5 30.5 25.1 30.5 32C30.5 38.9 34.5 43.5 40.2 43.5C45 43.5 48.5 40.2 48.5 35.4V33H41.2"
              stroke="#22D3EE"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 17L49 12M49 12H44.5M49 12V16.5"
              stroke="#3B82F6"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{PORTFOLIO_CONFIG.brandName}</span>
        </a>

        {/* Zone 2: Clean Single-Line Text Links */}
        <nav
          aria-label={language === 'en' ? 'Primary navigation' : 'মূল নেভিগেশন'}
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#F5F8FC]'
                    : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
                }`}
              >
                {item.label[language]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#22D3EE] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher + Primary Action / Mobile Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            role="group"
            aria-label={language === 'en' ? 'Language switch' : 'ভাষা পরিবর্তন'}
            className="inline-flex items-center rounded-lg border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] p-0.5"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`min-h-[36px] rounded-md px-2.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                language === 'en'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              aria-pressed={language === 'bn'}
              className={`min-h-[36px] rounded-md px-2.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                language === 'bn'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
              }`}
            >
              বাংলা
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden min-h-[40px] items-center justify-center rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#2563EB] sm:inline-flex"
          >
            {UI_COPY.nav.cta[language]}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileMenuOpen
                ? UI_COPY.nav.closeMenu[language]
                : UI_COPY.nav.openMenu[language]
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] text-[#F5F8FC] transition-colors hover:border-[#3B82F6]/50 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] md:hidden"
        >
          <nav
            aria-label={language === 'en' ? 'Mobile navigation' : 'মোবাইল নেভিগেশন'}
            className="mx-auto flex max-w-[1160px] flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#142A40] text-[#22D3EE]'
                      : 'text-[#A9B8C9] hover:bg-[#102238] hover:text-[#F5F8FC]'
                  }`}
                >
                  <span>{item.label[language]}</span>
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
            >
              {UI_COPY.nav.cta[language]}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
