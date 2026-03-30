// Meridian Growth Advisory - Home Page

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

export function HomePage() {
  const { currentLanguage, contentOverrides } = useApp();
  const navigate = useNavigate();
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

  const scrollToDomains = () => {
    document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroHeading = contentOverrides.heroHeading || getTranslation(t, 'hero.heading');
  const heroSubheading = contentOverrides.heroSubheading || getTranslation(t, 'hero.subheading');
  const heroPrimaryCta = contentOverrides.heroPrimaryCta || getTranslation(t, 'hero.primaryCta');
  const heroSecondaryCta = contentOverrides.heroSecondaryCta || getTranslation(t, 'hero.secondaryCta');
  const industriesLabel = contentOverrides.industriesLabel || getTranslation(t, 'industries.label');
  const industriesHeading = contentOverrides.industriesHeading || getTranslation(t, 'industries.heading');
  const domainsData = (t as any).domains || {};
  const domainsLabel = domainsData.label || 'Our Expertise';
  const domainsHeading = domainsData.heading || 'Our Domain Expertise';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="navy-grid-bg min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-up">
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
                {getTranslation(t, 'hero.eyebrow')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
                {heroHeading}
                <em className="gradient-text not-italic">{getTranslation(t, 'hero.headingEm')}</em>
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl">{heroSubheading}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={() => navigate('/contact')}>{heroPrimaryCta}</Button>
                <Button size="lg" variant="outline" onClick={scrollToDomains} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {heroSecondaryCta}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.years')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">32+</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.projects')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.countries')}</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block fade-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_66329d19-68f2-4163-a805-2f92b5acfbc5.jpg" alt="Professional business advisory" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                <Card className="absolute bottom-6 left-6 right-6 glass border-primary-foreground/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary-foreground mb-3">{getTranslation(t, 'hero.achievements.title')}</h3>
                    <ul className="space-y-2">
                      {['item1','item2','item3','item4'].map((key) => {
                        const val = getTranslation(t, `hero.achievements.${key}`);
                        return val ? (<li key={key} className="flex items-start gap-2 text-sm"><span className="text-primary">✓</span><span className="text-primary-foreground/90">{val}</span></li>) : null;
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TickerBanner />

      {/* Industries Section — FIRST */}
      <section id="industries" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{industriesLabel}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{industriesHeading}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industryKeys.map((industry, index) => (
              <Card key={industry} className="hover:bg-accent hover:border-primary/30 transition-all duration-300 fade-up bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${index * 80}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{industryIcons[industry]}</div>
                  <h3 className="text-lg font-bold mb-2">{getTranslation(t, `industries.cards.${industry}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{getTranslation(t, `industries.cards.${industry}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section — Merged Expertise */}
      <section id="domains" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{domainsLabel}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{domainsHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4,5,6,7,8].map((num) => {
              const cards = domainsData.cards;
              if (!cards) return null;
              const card = cards[num];
              if (!card) return null;
              return (
                <Card key={num} className="hover-lift fade-up group overflow-hidden" style={{ backgroundColor:'rgb(14,54,95)', borderColor:'rgb(51,60,77)', borderWidth:'1px', borderStyle:'solid', borderRadius:'16px' }}>
                  <CardContent className="p-8" style={{ backgroundColor:'rgb(14,54,95)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl font-bold text-primary/20">0{num}</div>
                      <div className="h-px flex-1 bg-primary/10" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-primary-foreground">{card.title}</h3>
                    <p className="text-primary-foreground/70 mb-6">{card.description}</p>
                    <div className="space-y-5">
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{card.detail1Title}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{card.detail1}</p>
                      </div>
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{card.detail2Title}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{card.detail2}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
