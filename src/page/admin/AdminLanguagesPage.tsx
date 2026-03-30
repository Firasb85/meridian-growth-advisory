// Meridian Growth Advisory - Admin Language Management Panel

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { flattenTranslations, groupTranslationKeys, getCategoryLabel, getKeyLabel } from '@/lib/translationHelpers';
import { Plus, Pencil, Trash2, Star, Save, Languages } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { Language, LanguageCode, Direction } from '@/types/types';

export function AdminLanguagesPage() {
  const {
    currentLanguage,
    languages,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    toggleLanguageEnabled,
    setDefaultLanguage,
    languageTranslationOverrides,
    updateLanguageTranslation,
  } = useApp();
  const t = translations[currentLanguage] || translations.en;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [selectedLangForTranslation, setSelectedLangForTranslation] = useState<string>('en');

  const form = useForm({
    defaultValues: {
      name: '',
      nativeName: '',
      code: '',
      direction: 'ltr' as Direction,
    },
  });

  // Get all translation keys from English (base language)
  const allTranslationKeys = flattenTranslations(translations.en);
  const groupedKeys = groupTranslationKeys(Object.keys(allTranslationKeys));

  // Translation overrides state
  const [translationOverrides, setTranslationOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load existing overrides for selected language
    const overrides = languageTranslationOverrides[selectedLangForTranslation] || {};
    setTranslationOverrides(overrides);
  }, [selectedLangForTranslation, languageTranslationOverrides]);

  const handleAdd = (data: any) => {
    addLanguage(data);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success('Language added');
  };

  const handleEdit = (language: Language) => {
    setEditingLanguage(language);
    form.reset({
      name: language.name,
      nativeName: language.nativeName,
      code: language.code,
      direction: language.direction,
    });
  };

  const handleUpdate = (data: any) => {
    if (editingLanguage) {
      updateLanguage(editingLanguage.code, data);
      setEditingLanguage(null);
      form.reset();
      toast.success('Language updated');
    }
  };

  const handleDelete = (code: LanguageCode) => {
    deleteLanguage(code);
    toast.success('Language deleted');
  };

  const handleSetDefault = (code: LanguageCode) => {
    setDefaultLanguage(code);
    toast.success('Default language updated');
  };

  const handleToggleEnabled = (code: LanguageCode) => {
    toggleLanguageEnabled(code);
    toast.success('Language status updated');
  };

  const handleTranslationChange = (key: string, value: string) => {
    setTranslationOverrides(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveTranslations = () => {
    updateLanguageTranslation(selectedLangForTranslation, translationOverrides);
    toast.success(`Translations saved for ${selectedLangForTranslation.toUpperCase()}`);
  };

  const handleSaveAllLanguages = () => {
    // Save current language translations
    updateLanguageTranslation(selectedLangForTranslation, translationOverrides);
    toast.success('All translations saved successfully!');
  };

  return (
    <AdminLayout title="Language Management">
      <div className="max-w-6xl space-y-6">
        <Tabs defaultValue="languages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="languages">
              <Languages className="w-4 h-4 mr-2" />
              Languages
            </TabsTrigger>
            <TabsTrigger value="translations">
              <Pencil className="w-4 h-4 mr-2" />
              Translations
            </TabsTrigger>
          </TabsList>

          {/* Languages Management Tab */}
          <TabsContent value="languages" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Language
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Installed Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Direction</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Enabled</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((lang) => (
                      <TableRow key={lang.code}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-muted-foreground">{lang.nativeName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{lang.code.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={lang.direction === 'rtl' ? 'default' : 'secondary'}>
                            {lang.direction.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={lang.enabled ? 'default' : 'secondary'}>
                            {lang.enabled ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {lang.default ? (
                            <Star className="w-4 h-4 text-primary fill-primary" />
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(lang.code)}
                            >
                              <Star className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={lang.enabled}
                            onCheckedChange={() => handleToggleEnabled(lang.code)}
                            disabled={lang.default}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(lang)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(lang.code)}
                              disabled={lang.default}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Translations Editor Tab */}
          <TabsContent value="translations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Translation Editor</CardTitle>
                  <div className="flex items-center gap-4">
                    <Label>Select Language:</Label>
                    <Select value={selectedLangForTranslation} onValueChange={setSelectedLangForTranslation}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.filter(l => l.enabled).map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name} ({lang.code.toUpperCase()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSaveTranslations}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Edit translations for <strong>{selectedLangForTranslation.toUpperCase()}</strong>. 
                    Leave fields empty to use default values from the base language.
                  </div>

                  <Accordion type="multiple" className="w-full">
                    {Object.entries(groupedKeys).map(([category, keys]) => (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger className="text-lg font-semibold">
                          {getCategoryLabel(category)}
                          <Badge variant="secondary" className="ml-2">
                            {keys.length} keys
                          </Badge>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-4">
                            {keys.map((key) => {
                              const baseValue = allTranslationKeys[key];
                              const overrideValue = translationOverrides[key] || '';
                              
                              return (
                                <div key={key} className="grid grid-cols-1 gap-2 p-4 border rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">{getKeyLabel(key)}</Label>
                                    <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                      {key}
                                    </code>
                                  </div>
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    <strong>Base (EN):</strong> {baseValue}
                                  </div>
                                  {baseValue.length > 100 ? (
                                    <Textarea
                                      value={overrideValue}
                                      onChange={(e) => handleTranslationChange(key, e.target.value)}
                                      placeholder={`Translation for ${selectedLangForTranslation.toUpperCase()}`}
                                      className="min-h-[80px]"
                                    />
                                  ) : (
                                    <Input
                                      value={overrideValue}
                                      onChange={(e) => handleTranslationChange(key, e.target.value)}
                                      placeholder={`Translation for ${selectedLangForTranslation.toUpperCase()}`}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="flex justify-end gap-4 pt-6">
                    <Button variant="outline" onClick={() => setTranslationOverrides({})}>
                      Reset All
                    </Button>
                    <Button onClick={handleSaveTranslations} size="lg">
                      <Save className="w-4 h-4 mr-2" />
                      Save Translations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Language Dialog */}
        <Dialog open={isAddDialogOpen || !!editingLanguage} onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingLanguage(null);
            form.reset();
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLanguage ? 'Edit Language' : 'Add New Language'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(editingLanguage ? handleUpdate : handleAdd)} className="space-y-4">
              <div>
                <Label>Language Name</Label>
                <Input {...form.register('name')} placeholder="English" />
              </div>
              <div>
                <Label>Native Name</Label>
                <Input {...form.register('nativeName')} placeholder="English" />
              </div>
              <div>
                <Label>Language Code</Label>
                <Input {...form.register('code')} placeholder="en" maxLength={5} />
              </div>
              <div>
                <Label>Text Direction</Label>
                <Select
                  value={form.watch('direction')}
                  onValueChange={(value) => form.setValue('direction', value as Direction)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ltr">LTR (Left to Right)</SelectItem>
                    <SelectItem value="rtl">RTL (Right to Left)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingLanguage(null);
                  form.reset();
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLanguage ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
