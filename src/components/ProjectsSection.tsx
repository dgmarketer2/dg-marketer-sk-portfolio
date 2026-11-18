import { useEffect, useState } from 'react';
import { ArrowUpRight, FolderKanban, X } from 'lucide-react';
import {
  PROJECT_FILTERS,
  PROJECTS,
  UI_COPY,
} from '../data/portfolioData';
import { Language, ProjectCategory, ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  language: Language;
  onDiscussProject: (topic: string) => void;
}

export function ProjectsSection({
  language,
  onDiscussProject,
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="projects"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#07111F] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#22D3EE]">
              {UI_COPY.projects.eyebrow[language]}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
              {UI_COPY.projects.heading[language]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
              {UI_COPY.projects.subheading[language]}
            </p>
          </div>

          {/* Interactive Category Filter Control */}
          <div
            role="tablist"
            aria-label={language === 'en' ? 'Filter projects by service category' : 'প্রজেক্ট ফিল্টার'}
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] p-1"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#3B82F6] text-white'
                      : 'text-[#A9B8C9] hover:text-[#F5F8FC]'
                  }`}
                >
                  {filter.label[language]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] transition-colors duration-200 hover:border-[#3B82F6]/60"
            >
              {/* Visual Mockup Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[rgba(148,163,184,0.14)] bg-[#0D1B2A]">
                {!failedImages[project.id] ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt[language]}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(project.id)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#102238] to-[#07111F] p-6 text-center">
                    <FolderKanban className="h-8 w-8 text-[#22D3EE]" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold text-[#F5F8FC]">
                      {project.title[language]}
                    </p>
                    <p className="mt-1 text-xs text-[#7C91A7]">
                      {project.projectTypeLabel[language]}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Body — Unboxed Typographic Metadata */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-[#22D3EE]">
                      {project.projectTypeLabel[language]}
                    </span>
                    <span aria-hidden="true" className="text-[#7C91A7]">
                      ·
                    </span>
                    <span className="text-[#A9B8C9]">
                      {project.categoryLabel[language]}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#F5F8FC]">
                    {project.title[language]}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#A9B8C9]">
                    {project.shortDescription[language]}
                  </p>
                </div>

                <div className="mt-6 border-t border-[rgba(148,163,184,0.14)] pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 text-sm font-semibold text-[#F5F8FC] transition-colors duration-150 hover:text-[#22D3EE]"
                  >
                    <span>{UI_COPY.projects.viewDetails[language]}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Scope Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F]/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[rgba(148,163,184,0.24)] bg-[#102238] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#22D3EE]">
                  {selectedProject.projectTypeLabel[language]} ·{' '}
                  {selectedProject.categoryLabel[language]}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1.5 font-display text-2xl font-bold text-[#F5F8FC]"
                >
                  {selectedProject.title[language]}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label={UI_COPY.projects.modalClose[language]}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0D1B2A] text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A]">
              {!failedImages[selectedProject.id] ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt[language]}
                  referrerPolicy="no-referrer"
                  className="max-h-[340px] w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-[#7C91A7]">
                  {selectedProject.title[language]}
                </div>
              )}
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-[#F5F8FC]">
                  {UI_COPY.projects.modalOverviewTitle[language]}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#A9B8C9]">
                  {selectedProject.overview[language]}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#F5F8FC]">
                  {UI_COPY.projects.modalDeliverablesTitle[language]}
                </h4>
                <ul className="mt-2 divide-y divide-[rgba(148,163,184,0.14)]">
                  {selectedProject.scopeDeliverables[language].map((item) => (
                    <li key={item} className="py-2.5 text-sm text-[#A9B8C9]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] p-4">
                <p className="text-xs leading-relaxed text-[#7C91A7]">
                  {selectedProject.disclaimer[language]}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[rgba(148,163,184,0.14)] pt-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="min-h-[44px] rounded-xl border border-[rgba(148,163,184,0.22)] px-4 py-2 text-sm font-medium text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
              >
                {UI_COPY.projects.modalClose[language]}
              </button>
              <button
                type="button"
                onClick={() => {
                  const categoryTitle = selectedProject.categoryLabel[language];
                  setSelectedProject(null);
                  onDiscussProject(categoryTitle);
                }}
                className="min-h-[44px] rounded-xl bg-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
              >
                {UI_COPY.projects.modalDiscussCta[language]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
