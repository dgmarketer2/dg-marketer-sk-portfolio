import { NAV_ITEMS, PORTFOLIO_CONFIG, SOCIAL_CHANNELS, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Footer({ language, onLanguageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const verifiedSocials = SOCIAL_CHANNELS.filter((channel) => Boolean(channel.url));

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#07111F] py-12">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 border-b border-[rgba(148,163,184,0.18)] pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-[#F5F8FC]">
              {PORTFOLIO_CONFIG.brandName}
            </p>
            <p className="mt-1.5 text-sm text-[#A9B8C9]">
              {PORTFOLIO_CONFIG.fullName} · {UI_COPY.footer.role[language]}
            </p>
            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="mt-2 inline-block text-sm font-medium text-[#22D3EE] transition-colors hover:text-[#F5F8FC]"
            >
              {PORTFOLIO_CONFIG.email}
            </a>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav
              aria-label={language === 'en' ? 'Footer navigation' : 'ফুটার নেভিগেশন'}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="text-sm text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
                >
                  {item.label[language]}
                </a>
              ))}
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
                className="text-sm text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
              >
                {language === 'en' ? 'Skills' : 'দক্ষতা'}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="text-sm text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
              >
                {language === 'en' ? 'Contact' : 'যোগাযোগ'}
              </a>
            </nav>

            {verifiedSocials.length > 0 && (
              <div className="flex flex-wrap gap-4 text-xs text-[#A9B8C9]">
                {verifiedSocials.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#22D3EE]"
                  >
                    {channel.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#7C91A7]">
            © {currentYear} {PORTFOLIO_CONFIG.brandName} · {PORTFOLIO_CONFIG.fullName}.{' '}
            {UI_COPY.footer.rights[language]}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`min-h-[32px] px-2 font-medium transition-colors ${
                language === 'en' ? 'text-[#22D3EE]' : 'text-[#7C91A7] hover:text-[#F5F8FC]'
              }`}
            >
              English
            </button>
            <span aria-hidden="true" className="text-[#7C91A7]">
              |
            </span>
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              className={`min-h-[32px] px-2 font-medium transition-colors ${
                language === 'bn' ? 'text-[#22D3EE]' : 'text-[#7C91A7] hover:text-[#F5F8FC]'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
