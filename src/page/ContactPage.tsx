// Meridian Growth Advisory - Contact Page

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { Mail, Phone, Globe, X } from 'lucide-react';

const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  company: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactPage() {
  const { currentLanguage, contentOverrides, addRequest } = useApp();
  const t = translations[currentLanguage] || translations.en;
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data: ContactFormValues) => {
    addRequest({
      fullName: data.fullName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message,
      files: files.length > 0 ? files : undefined,
    });
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const contactEmail = contentOverrides.contactEmail || 'contact@meridian.com';
  const contactPhone = contentOverrides.contactPhone || '+966 XX XXX XXXX';

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {getTranslation(t, 'contact.success.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {getTranslation(t, 'contact.success.message')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {getTranslation(t, 'contact.heading')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Info Panel */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                {getTranslation(t, 'contact.info.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {getTranslation(t, 'contact.info.subtitle')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">{getTranslation(t, 'contact.info.email')}</div>
                    <a href={`mailto:${contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">{getTranslation(t, 'contact.info.phone')}</div>
                    <a href={`tel:${contactPhone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">{getTranslation(t, 'contact.info.coverage')}</div>
                    <div className="text-muted-foreground">
                      {getTranslation(t, 'contact.info.coverageValue')}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getTranslation(t, 'contact.form.fullName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={getTranslation(t, 'contact.form.fullNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getTranslation(t, 'contact.form.company')}</FormLabel>
                        <FormControl>
                          <Input placeholder={getTranslation(t, 'contact.form.companyPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getTranslation(t, 'contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={getTranslation(t, 'contact.form.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getTranslation(t, 'contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input placeholder={getTranslation(t, 'contact.form.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{getTranslation(t, 'contact.form.objective')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={getTranslation(t, 'contact.form.objectivePlaceholder')}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Attachments */}
                  <div>
                    <Label>{getTranslation(t, 'contact.form.attachments')}</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      {getTranslation(t, 'contact.form.attachmentsHelper')}
                    </p>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {files.map((file, index) => (
                          <Badge key={index} variant="secondary" className="pr-1">
                            {file.name}
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {form.formState.isSubmitting
                      ? getTranslation(t, 'contact.form.submitting')
                      : getTranslation(t, 'contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
