import { PORTFOLIO_CONFIG, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface AboutSectionProps {
  language: Language;
}

export function AboutSection({ language }: AboutSectionProps) {
  const pillars = UI_COPY.about.pillars[language];

  return (
    <section
      id="about"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#0D1B2A]/55 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative */}
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-[#22D3EE]">
              {UI_COPY.about.eyebrow[language]}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
              {UI_COPY.about.heading[language]}
            </h2>

            <p className="mt-6 text-base leading-[1.7] text-[#A9B8C9] sm:text-[17px]">
              {UI_COPY.about.paragraph[language]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(148,163,184,0.18)] pt-5 text-sm text-[#A9B8C9]">
              <span>
                <strong className="font-semibold text-[#F5F8FC]">
                  {PORTFOLIO_CONFIG.fullName}
                </strong>
              </span>
              <span aria-hidden="true" className="text-[#7C91A7]">
                ·
              </span>
              <span>{PORTFOLIO_CONFIG.brandName}</span>
            </div>
          </div>

          {/* Right Focus Pillars */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-[#F5F8FC]">
                {UI_COPY.about.pillarsTitle[language]}
              </h3>

              <div className="mt-5 divide-y divide-[rgba(148,163,184,0.14)]">
                {pillars.map((pillar, index) => (
                  <div key={pillar.label} className="py-4 first:pt-2 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-num text-xs font-medium text-[#22D3EE]">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-semibold text-[#F5F8FC]">
                          {pillar.label}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#A9B8C9]">
                          {pillar.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
