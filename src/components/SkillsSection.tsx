import { Layers } from 'lucide-react';
import { CONFIRMED_TOOLS, SKILL_GROUPS, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface SkillsSectionProps {
  language: Language;
}

export function SkillsSection({ language }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#0D1B2A]/55 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#22D3EE]">
            {UI_COPY.skills.eyebrow[language]}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
            {UI_COPY.skills.heading[language]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
            {UI_COPY.skills.subheading[language]}
          </p>
        </div>

        {/* Capability Columns — No Fake Percentages */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6"
            >
              <h3 className="font-display text-lg font-bold text-[#F5F8FC]">
                {group.title[language]}
              </h3>
              <ul className="mt-4 divide-y divide-[rgba(148,163,184,0.14)]">
                {group.items.map((item) => (
                  <li
                    key={item.en}
                    className="py-3 text-sm font-medium text-[#A9B8C9] first:pt-1 last:pb-0"
                  >
                    {item[language]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tools & Platforms — Confirmed Only / Editable Placeholder */}
        <div className="mt-8 rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238]/75 p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#142A40] text-[#22D3EE]">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-[#F5F8FC]">
                  {UI_COPY.skills.toolsHeading[language]}
                </h3>
                {CONFIRMED_TOOLS.length > 0 ? (
                  <p className="mt-2 text-sm text-[#A9B8C9]">
                    {CONFIRMED_TOOLS.join(' · ')}
                  </p>
                ) : (
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[#7C91A7]">
                    {UI_COPY.skills.toolsPlaceholderNote[language]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
