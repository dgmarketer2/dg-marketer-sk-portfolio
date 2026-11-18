import {
  ArrowUpRight,
  CalendarCheck2,
  Megaphone,
  Search,
  Share2,
  Target,
} from 'lucide-react';
import { SERVICES, UI_COPY } from '../data/portfolioData';
import { Language, ServiceItem } from '../types/portfolio';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (serviceTitle: string) => void;
}

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  const iconClass = 'h-5 w-5 text-[#22D3EE]';
  switch (name) {
    case 'share2':
      return <Share2 className={iconClass} aria-hidden="true" />;
    case 'megaphone':
      return <Megaphone className={iconClass} aria-hidden="true" />;
    case 'search':
      return <Search className={iconClass} aria-hidden="true" />;
    case 'target':
      return <Target className={iconClass} aria-hidden="true" />;
    case 'calendarCheck':
      return <CalendarCheck2 className={iconClass} aria-hidden="true" />;
  }
}

export function ServicesSection({ language, onSelectService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#07111F] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#22D3EE]">
            {UI_COPY.services.eyebrow[language]}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
            {UI_COPY.services.heading[language]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
            {UI_COPY.services.subheading[language]}
          </p>
        </div>

        {/* Asymmetric Bento Grid: 2 primary wide cards on row 1, 3 cards on row 2 */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, idx) => {
            const spanClass =
              idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <article
                key={service.id}
                className={`group flex flex-col justify-between rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 transition-colors duration-200 hover:border-[#3B82F6]/60 sm:p-7 ${spanClass}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#142A40]">
                      <ServiceIcon name={service.iconName} />
                    </div>
                    <span className="font-mono-num text-xs font-medium text-[#7C91A7]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-[#F5F8FC]">
                    {service.title[language]}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#A9B8C9] sm:text-[15px]">
                    {service.description[language]}
                  </p>

                  {/* Unboxed typographic scope list */}
                  <p className="mt-4 text-xs leading-relaxed text-[#7C91A7]">
                    {service.focusPoints[language].join(' · ')}
                  </p>
                </div>

                <div className="mt-6 border-t border-[rgba(148,163,184,0.14)] pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title[language])}
                    className="inline-flex min-h-[36px] items-center gap-1.5 text-sm font-semibold text-[#22D3EE] transition-colors duration-150 hover:text-[#F5F8FC]"
                  >
                    <span>{UI_COPY.services.discussCta[language]}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
