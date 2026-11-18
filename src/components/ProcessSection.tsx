import { PROCESS_STEPS, UI_COPY } from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface ProcessSectionProps {
  language: Language;
}

export function ProcessSection({ language }: ProcessSectionProps) {
  return (
    <section
      id="process"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#0D1B2A]/55 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#22D3EE]">
            {UI_COPY.process.eyebrow[language]}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
            {UI_COPY.process.heading[language]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
            {UI_COPY.process.subheading[language]}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-num text-2xl font-bold text-[#22D3EE]">
                    {step.number}
                  </span>
                  {index < PROCESS_STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-10 bg-[rgba(148,163,184,0.28)] lg:inline-block"
                    />
                  )}
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-[#F5F8FC]">
                  {step.title[language]}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#7C91A7]">
                  {step.subtitle[language]}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#A9B8C9]">
                  {step.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
