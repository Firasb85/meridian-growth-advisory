// Meridian Growth Advisory - Admin CRM Panel

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { format } from 'date-fns';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import type { CRMEntry } from '@/types/types';

export function AdminCRMPage() {
  const { currentLanguage, crmEntries, addCRMEntry, updateCRMEntry, deleteCRMEntry } = useApp();
  const t = translations[currentLanguage] || translations.en;
  const [search, setSearch] = useState('');
  const [editingEntry, setEditingEntry] = useState<CRMEntry | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  const filteredEntries = crmEntries.filter(entry => {
    const searchLower = search.toLowerCase();
    return (
      entry.fullName.toLowerCase().includes(searchLower) ||
      entry.company?.toLowerCase().includes(searchLower) ||
      entry.email?.toLowerCase().includes(searchLower)
    );
  });

  const thisMonth = crmEntries.filter(entry => {
    const now = new Date();
    const entryDate = new Date(entry.createdAt);
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  }).length;

  const withNotes = crmEntries.filter(entry => entry.notes && entry.notes.trim().length > 0).length;

  const handleAdd = (data: any) => {
    addCRMEntry(data);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success('Customer added');
  };

  const handleEdit = (entry: CRMEntry) => {
    setEditingEntry(entry);
    form.reset({
      fullName: entry.fullName,
      company: entry.company || '',
      email: entry.email || '',
      phone: entry.phone || '',
      notes: entry.notes || '',
    });
  };

  const handleUpdate = (data: any) => {
    if (editingEntry) {
      updateCRMEntry(editingEntry.id, data);
      setEditingEntry(null);
      form.reset();
      toast.success('Customer updated');
    }
  };

  const handleDelete = (id: string) => {
    deleteCRMEntry(id);
    toast.success('Customer deleted');
  };

  return (
    <AdminLayout title={getTranslation(t, 'admin.crm.title')}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.crm.total')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{crmEntries.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.crm.thisMonth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{thisMonth}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.crm.withNotes')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{withNotes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={getTranslation(t, 'admin.crm.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {getTranslation(t, 'admin.crm.add')}
        </Button>
      </div>

      {/* CRM Table */}
      <Card>
        <CardContent className="p-0">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {getTranslation(t, 'admin.crm.empty')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{getTranslation(t, 'admin.crm.name')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.crm.contact')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.crm.company')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.crm.added')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.crm.notes')}</TableHead>
                  <TableHead className="text-right">{getTranslation(t, 'admin.crm.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{entry.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{entry.fullName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{entry.email || 'N/A'}</div>
                        <div className="text-muted-foreground">{entry.phone || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>{entry.company || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(entry.createdAt, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate text-sm text-muted-foreground">
                        {entry.notes || 'No notes'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(entry)}
                          title={getTranslation(t, 'admin.crm.edit')}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(entry.id)}
                          title={getTranslation(t, 'admin.crm.delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || !!editingEntry} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setEditingEntry(null);
          form.reset();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEntry 
                ? getTranslation(t, 'admin.crm.form.editTitle')
                : getTranslation(t, 'admin.crm.form.title')}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editingEntry ? handleUpdate : handleAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.crm.form.fullName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.crm.form.company')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.crm.form.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.crm.form.phone')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.crm.form.notes')}</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[100px]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingEntry(null);
                    form.reset();
                  }}
                >
                  {getTranslation(t, 'admin.crm.form.cancel')}
                </Button>
                <Button type="submit">
                  {getTranslation(t, 'admin.crm.form.save')}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
