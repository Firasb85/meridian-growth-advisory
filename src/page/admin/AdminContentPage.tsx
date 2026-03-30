// Meridian Growth Advisory - Admin Content Management Panel

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export function AdminContentPage() {
  const { currentLanguage, contentOverrides, updateContentOverrides } = useApp();
  const t = translations[currentLanguage] || translations.en;

  const [formData, setFormData] = useState({
    // Brand Identity
    logoText: '',
    tagline: '',
    // Hero Section
    heroHeading: '',
    heroSubheading: '',
    heroPrimaryCta: '',
    heroSecondaryCta: '',
    // Outcomes Section
    outcomesLabel: '',
    outcomesHeading: '',
    // Industries Section
    industriesLabel: '',
    industriesHeading: '',
    // Services Section
    servicesLabel: '',
    servicesHeading: '',
    servicesCtaText: '',
    servicesCtaButton: '',
    // About Section
    aboutLabel: '',
    aboutHeading: '',
    aboutHeadingEm: '',
    aboutBody1: '',
    aboutBody2: '',
    aboutBody3: '',
    // Contact Section
    contactHeading: '',
    contactInfoTitle: '',
    contactInfoSubtitle: '',
    contactEmail: '',
    contactPhone: '',
    contactWhatsapp: '',
    // CTA Band
    ctaTitle: '',
    ctaSubtext: '',
    ctaButton: '',
    // Footer
    footerDescription: '',
  });

  useEffect(() => {
    setFormData({
      logoText: contentOverrides.logoText || '',
      tagline: contentOverrides.tagline || '',
      heroHeading: contentOverrides.heroHeading || '',
      heroSubheading: contentOverrides.heroSubheading || '',
      heroPrimaryCta: contentOverrides.heroPrimaryCta || '',
      heroSecondaryCta: contentOverrides.heroSecondaryCta || '',
      outcomesLabel: contentOverrides.outcomesLabel || '',
      outcomesHeading: contentOverrides.outcomesHeading || '',
      industriesLabel: contentOverrides.industriesLabel || '',
      industriesHeading: contentOverrides.industriesHeading || '',
      servicesLabel: contentOverrides.servicesLabel || '',
      servicesHeading: contentOverrides.servicesHeading || '',
      servicesCtaText: contentOverrides.servicesCtaText || '',
      servicesCtaButton: contentOverrides.servicesCtaButton || '',
      aboutLabel: contentOverrides.aboutLabel || '',
      aboutHeading: contentOverrides.aboutHeading || '',
      aboutHeadingEm: contentOverrides.aboutHeadingEm || '',
      aboutBody1: contentOverrides.aboutBody1 || '',
      aboutBody2: contentOverrides.aboutBody2 || '',
      aboutBody3: contentOverrides.aboutBody3 || '',
      contactHeading: contentOverrides.contactHeading || '',
      contactInfoTitle: contentOverrides.contactInfoTitle || '',
      contactInfoSubtitle: contentOverrides.contactInfoSubtitle || '',
      contactEmail: contentOverrides.contactEmail || '',
      contactPhone: contentOverrides.contactPhone || '',
      contactWhatsapp: contentOverrides.contactWhatsapp || '',
      ctaTitle: contentOverrides.ctaTitle || '',
      ctaSubtext: contentOverrides.ctaSubtext || '',
      ctaButton: contentOverrides.ctaButton || '',
      footerDescription: contentOverrides.footerDescription || '',
    });
  }, [contentOverrides]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateContentOverrides(formData);
    toast.success('Content saved successfully!');
  };

  return (
    <AdminLayout title="Content Management">
      <div className="max-w-5xl space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="brand" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Brand Identity Tab */}
          <TabsContent value="brand" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Logo Text / Brand Name</Label>
                  <Input
                    value={formData.logoText}
                    onChange={(e) => handleChange('logoText', e.target.value)}
                    placeholder="Meridian"
                  />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    placeholder="Market Expansion Advisory"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Band</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>CTA Title</Label>
                  <Input
                    value={formData.ctaTitle}
                    onChange={(e) => handleChange('ctaTitle', e.target.value)}
                    placeholder={getTranslation(t, 'cta.title')}
                  />
                </div>
                <div>
                  <Label>CTA Subtext</Label>
                  <Textarea
                    value={formData.ctaSubtext}
                    onChange={(e) => handleChange('ctaSubtext', e.target.value)}
                    placeholder={getTranslation(t, 'cta.subtext')}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label>CTA Button Text</Label>
                  <Input
                    value={formData.ctaButton}
                    onChange={(e) => handleChange('ctaButton', e.target.value)}
                    placeholder={getTranslation(t, 'cta.button')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Footer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Footer Description</Label>
                  <Textarea
                    value={formData.footerDescription}
                    onChange={(e) => handleChange('footerDescription', e.target.value)}
                    placeholder={getTranslation(t, 'footer.description')}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Section Tab */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Main Heading</Label>
                  <Input
                    value={formData.heroHeading}
                    onChange={(e) => handleChange('heroHeading', e.target.value)}
                    placeholder={getTranslation(t, 'hero.heading')}
                  />
                </div>
                <div>
                  <Label>Sub-heading</Label>
                  <Textarea
                    value={formData.heroSubheading}
                    onChange={(e) => handleChange('heroSubheading', e.target.value)}
                    placeholder={getTranslation(t, 'hero.subheading')}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Primary CTA Button Text</Label>
                  <Input
                    value={formData.heroPrimaryCta}
                    onChange={(e) => handleChange('heroPrimaryCta', e.target.value)}
                    placeholder={getTranslation(t, 'hero.primaryCta')}
                  />
                </div>
                <div>
                  <Label>Secondary CTA Button Text</Label>
                  <Input
                    value={formData.heroSecondaryCta}
                    onChange={(e) => handleChange('heroSecondaryCta', e.target.value)}
                    placeholder={getTranslation(t, 'hero.secondaryCta')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outcomes Section Tab */}
          <TabsContent value="outcomes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Outcomes Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Label</Label>
                  <Input
                    value={formData.outcomesLabel}
                    onChange={(e) => handleChange('outcomesLabel', e.target.value)}
                    placeholder={getTranslation(t, 'outcomes.label')}
                  />
                </div>
                <div>
                  <Label>Section Heading</Label>
                  <Input
                    value={formData.outcomesHeading}
                    onChange={(e) => handleChange('outcomesHeading', e.target.value)}
                    placeholder={getTranslation(t, 'outcomes.heading')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Industries Section Tab */}
          <TabsContent value="industries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Industries Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Label</Label>
                  <Input
                    value={formData.industriesLabel}
                    onChange={(e) => handleChange('industriesLabel', e.target.value)}
                    placeholder={getTranslation(t, 'industries.label')}
                  />
                </div>
                <div>
                  <Label>Section Heading</Label>
                  <Input
                    value={formData.industriesHeading}
                    onChange={(e) => handleChange('industriesHeading', e.target.value)}
                    placeholder={getTranslation(t, 'industries.heading')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Section Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Services Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Label</Label>
                  <Input
                    value={formData.servicesLabel}
                    onChange={(e) => handleChange('servicesLabel', e.target.value)}
                    placeholder={getTranslation(t, 'services.label')}
                  />
                </div>
                <div>
                  <Label>Section Heading</Label>
                  <Input
                    value={formData.servicesHeading}
                    onChange={(e) => handleChange('servicesHeading', e.target.value)}
                    placeholder={getTranslation(t, 'services.heading')}
                  />
                </div>
                <div>
                  <Label>CTA Text</Label>
                  <Input
                    value={formData.servicesCtaText}
                    onChange={(e) => handleChange('servicesCtaText', e.target.value)}
                    placeholder={getTranslation(t, 'services.ctaText')}
                  />
                </div>
                <div>
                  <Label>CTA Button Text</Label>
                  <Input
                    value={formData.servicesCtaButton}
                    onChange={(e) => handleChange('servicesCtaButton', e.target.value)}
                    placeholder={getTranslation(t, 'services.ctaButton')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Label</Label>
                  <Input
                    value={formData.aboutLabel}
                    onChange={(e) => handleChange('aboutLabel', e.target.value)}
                    placeholder={getTranslation(t, 'about.label')}
                  />
                </div>
                <div>
                  <Label>Main Heading</Label>
                  <Input
                    value={formData.aboutHeading}
                    onChange={(e) => handleChange('aboutHeading', e.target.value)}
                    placeholder={getTranslation(t, 'about.heading')}
                  />
                </div>
                <div>
                  <Label>Heading Emphasis Text</Label>
                  <Input
                    value={formData.aboutHeadingEm}
                    onChange={(e) => handleChange('aboutHeadingEm', e.target.value)}
                    placeholder={getTranslation(t, 'about.headingEm')}
                  />
                </div>
                <div>
                  <Label>Body Paragraph 1</Label>
                  <Textarea
                    value={formData.aboutBody1}
                    onChange={(e) => handleChange('aboutBody1', e.target.value)}
                    placeholder={getTranslation(t, 'about.body1')}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Body Paragraph 2</Label>
                  <Textarea
                    value={formData.aboutBody2}
                    onChange={(e) => handleChange('aboutBody2', e.target.value)}
                    placeholder={getTranslation(t, 'about.body2')}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Body Paragraph 3</Label>
                  <Textarea
                    value={formData.aboutBody3}
                    onChange={(e) => handleChange('aboutBody3', e.target.value)}
                    placeholder={getTranslation(t, 'about.body3')}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Section Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Page Heading</Label>
                  <Input
                    value={formData.contactHeading}
                    onChange={(e) => handleChange('contactHeading', e.target.value)}
                    placeholder={getTranslation(t, 'contact.heading')}
                  />
                </div>
                <div>
                  <Label>Info Panel Title</Label>
                  <Input
                    value={formData.contactInfoTitle}
                    onChange={(e) => handleChange('contactInfoTitle', e.target.value)}
                    placeholder={getTranslation(t, 'contact.info.title')}
                  />
                </div>
                <div>
                  <Label>Info Panel Subtitle</Label>
                  <Textarea
                    value={formData.contactInfoSubtitle}
                    onChange={(e) => handleChange('contactInfoSubtitle', e.target.value)}
                    placeholder={getTranslation(t, 'contact.info.subtitle')}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    placeholder="contact@meridian.com"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input
                    type="tel"
                    value={formData.contactWhatsapp}
                    onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
