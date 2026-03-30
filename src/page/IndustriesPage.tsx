// Meridian Growth Advisory - Industries Page

import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TickerBanner } from '@/components/TickerBanner';
import { CTABand } from '@/components/CTABand';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

const industryKeys = ['realestate', 'fmcg', 'fnb', 'telecom', 'distribution'] as const;
const industryIcons: Record<string, string> = {
  realestate: '🏢',
  fmcg: '🛒',
  fnb: '🍽️',
  telecom: '📡',
  distribution: '🚛',
};

export function IndustriesPage() {
  const { currentLanguage } = useApp();
  const t = translations[currentLanguage] || translations.en;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => { observerRef.current?.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen">
      <section className="navy-grid-bg pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {getTranslation(t, 'industries.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {getTranslation(t, 'industries.heading')}
          </h1>
        </div>
      </section>

      <TickerBanner />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {industryKeys.map((industry, index) => (
              <Card key={industry} className="hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-6">{industryIcons[industry]}</div>
                  <h3 className="text-2xl font-bold mb-3">
                    {getTranslation(t, `industries.cards.${industry}.name`)}
                  </h3>
                  <p className="text-sm opacity-80">
                    {getTranslation(t, `industries.cards.${industry}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
