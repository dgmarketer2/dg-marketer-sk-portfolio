import { useState } from 'react';
import { ArrowRight, UserRound } from 'lucide-react';
import { PORTFOLIO_CONFIG, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const [portraitLoadFailed, setPortraitLoadFailed] = useState(false);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] bg-[#07111F]"
    >
      {/* Decorative Abstract Background Visual */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={PORTFOLIO_CONFIG.heroBackgroundImage}
          alt=""
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/88 to-[#07111F]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07111F]" />
      </div>

      <div className="relative mx-auto max-w-[1160px] px-4 py-14 sm:px-6 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Brand Kicker, Headline, Value Prop & CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-[#22D3EE]">
              {UI_COPY.hero.kicker[language]}
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-[#F5F8FC]">
              {UI_COPY.hero.headline[language]}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#A9B8C9] sm:text-lg">
              {UI_COPY.hero.subheadline[language]}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#2563EB]"
              >
                <span>{UI_COPY.hero.primaryCta[language]}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[rgba(148,163,184,0.28)] bg-[#0D1B2A]/80 px-6 py-3 text-sm font-semibold text-[#F5F8FC] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#22D3EE]/60 hover:bg-[#102238]"
              >
                {UI_COPY.hero.secondaryCta[language]}
              </a>
            </div>

            <div className="mt-10 border-t border-[rgba(148,163,184,0.18)] pt-5">
              <p className="text-xs font-medium text-[#7C91A7] sm:text-sm">
                {UI_COPY.hero.identityLine[language]}
              </p>
            </div>
          </div>

          {/* Right Column: Portrait Container (User Photo / Architectural Placeholder) */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.2)] bg-[#0D1B2A] aspect-[4/5] lg:aspect-auto lg:min-h-[460px]">
              {!portraitLoadFailed ? (
                <img
                  src={PORTFOLIO_CONFIG.portrait.src}
                  alt={`${PORTFOLIO_CONFIG.fullName} — ${UI_COPY.hero.portraitPlaceholderRole[language]}`}
                  onError={() => setPortraitLoadFailed(true)}
                  style={{ objectPosition: PORTFOLIO_CONFIG.portrait.objectPosition }}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#102238] via-[#0D1B2A] to-[#07111F] p-7 sm:p-8">
                  {/* Subtle ambient accent glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#3B82F6]/15 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-[#22D3EE]/10 blur-3xl"
                  />

                  <div className="relative flex items-center justify-between text-xs text-[#7C91A7]">
                    <span className="font-semibold tracking-wider text-[#22D3EE]">
                      {PORTFOLIO_CONFIG.brandName}
                    </span>
                    <span className="font-mono-num">4:5</span>
                  </div>

                  {/* Architectural Silhouette Emblem (Not a fake person photo) */}
                  <div className="relative my-auto flex flex-col items-center py-8 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(148,163,184,0.24)] bg-[#142A40]/70 text-[#22D3EE]">
                      <UserRound className="h-12 w-12 stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <p className="mt-5 font-display text-xl font-bold text-[#F5F8FC]">
                      {UI_COPY.hero.portraitPlaceholderTitle[language]}
                    </p>
                    <p className="mt-1 text-sm text-[#A9B8C9]">
                      {UI_COPY.hero.portraitPlaceholderRole[language]}
                    </p>
                  </div>

                  <div className="relative border-t border-[rgba(148,163,184,0.18)] pt-4 text-center">
                    <p className="text-xs leading-relaxed text-[#7C91A7]">
                      {UI_COPY.hero.portraitPlaceholderHint[language]}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom caption scrim + Contact CTA when real user portrait is loaded */}
              {!portraitLoadFailed && (
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#07111F] via-[#07111F]/85 to-transparent px-5 pb-5 pt-16">
                  <div>
                    <p className="font-display text-base font-bold text-[#F5F8FC]">
                      {PORTFOLIO_CONFIG.fullName}
                    </p>
                    <p className="text-xs text-[#A9B8C9]">
                      {UI_COPY.hero.portraitPlaceholderRole[language]} · {PORTFOLIO_CONFIG.brandName}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#2563EB]"
                  >
                    <span>{language === 'en' ? 'Contact Me' : 'যোগাযোগ করুন'}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
