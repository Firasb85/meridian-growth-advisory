// Meridian Growth Advisory - About Page

import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { CTABand } from '@/components/CTABand';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function AboutPage() {
  const { currentLanguage } = useApp();
  const t = translations[currentLanguage] || translations.en;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="navy-grid-bg pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {getTranslation(t, 'about.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {getTranslation(t, 'about.heading')}
            <em className="gradient-text not-italic">{getTranslation(t, 'about.headingEm')}</em>
            {getTranslation(t, 'about.heading2')}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Body Text */}
            <div className="space-y-6 fade-up">
              <p className="text-lg text-foreground/80 leading-relaxed">
                {getTranslation(t, 'about.body1')}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {getTranslation(t, 'about.body2')}
              </p>
              <p className="text-xl font-bold text-primary leading-relaxed">
                {getTranslation(t, 'about.body3')}
              </p>
            </div>

            {/* Right Column - Values */}
            <div className="space-y-6 fade-up">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {getTranslation(t, `about.values.${num}.name`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {getTranslation(t, `about.values.${num}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand />
    </div>
  );
}
