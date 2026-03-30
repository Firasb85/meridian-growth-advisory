// Meridian Growth Advisory - Services Page

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CTABand } from '@/components/CTABand';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function ServicesPage() {
  const { currentLanguage } = useApp();
  const navigate = useNavigate();
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
            {getTranslation(t, 'services.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {getTranslation(t, 'services.heading')}
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="navy-grid-bg py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Card key={num} className="border-reveal hover-lift bg-card/50 backdrop-blur-sm fade-up" style={{ animationDelay: `${num * 50}ms` }}>
                <CardContent className="p-6">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {getTranslation(t, `services.cards.${num}.value`)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {getTranslation(t, `services.cards.${num}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getTranslation(t, `services.cards.${num}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 fade-up">
            <p className="text-lg text-primary-foreground/80 mb-6">
              {getTranslation(t, 'services.ctaText')}
            </p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              {getTranslation(t, 'services.ctaButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand />
    </div>
  );
}
