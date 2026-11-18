/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CreativeStudioSection } from './components/CreativeStudioSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ThreeStudioShowcase } from './components/ThreeStudioShowcase';
import { Language } from './types/portfolio';

const SECTION_IDS = [
  'home',
  'about',
  'services',
  'studio-3d',
  'ai-studio',
  'skills',
  'projects',
  'process',
  'contact',
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [captured3DFrame, setCaptured3DFrame] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
  }, [language]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleJumpToContactWithTopic = (topic: string) => {
    setPreselectedService(topic);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCapture3DFrame = useCallback((dataUrl: string) => {
    setCaptured3DFrame(dataUrl);
    const studioEl = document.getElementById('ai-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClearCapturedFrame = useCallback(() => {
    setCaptured3DFrame(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F5F8FC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#3B82F6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {language === 'en' ? 'Skip to main content' : 'মূল অংশে যান'}
      </a>

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        activeSection={activeSection}
      />

      <main id="main-content">
        <HeroSection language={language} />
        <ThreeStudioShowcase
          language={language}
          onCaptureFrame={handleCapture3DFrame}
        />
        <CreativeStudioSection
          language={language}
          incomingImageDataUrl={captured3DFrame}
          onClearIncomingImage={handleClearCapturedFrame}
        />
        <AboutSection language={language} />
        <ServicesSection
          language={language}
          onSelectService={handleJumpToContactWithTopic}
        />
        <SkillsSection language={language} />
        <ProjectsSection
          language={language}
          onDiscussProject={handleJumpToContactWithTopic}
        />
        <ProcessSection language={language} />
        <ContactSection
          language={language}
          preselectedService={preselectedService}
        />
      </main>

      <Footer language={language} onLanguageChange={setLanguage} />
    </div>
  );
}
