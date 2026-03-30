// Meridian Growth Advisory - Admin Requests Panel

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { format } from 'date-fns';
import { Eye, Repeat, Trash2, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import type { ContactRequest } from '@/types/types';

export function AdminRequestsPage() {
  const { currentLanguage, requests, updateRequestStatus, deleteRequest, convertRequestToCRM } = useApp();
  const t = translations[currentLanguage] || translations.en;
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'done'>('all');
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    done: requests.filter(r => r.status === 'done').length,
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'default',
      'in-progress': 'secondary',
      done: 'outline',
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const handleFileDownload = (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded: ${file.name}`);
    } catch (error) {
      toast.error('Failed to download file');
    }
  };

  const handleStatusUpdate = (id: string, status: ContactRequest['status']) => {
    updateRequestStatus(id, status);
    toast.success('Status updated');
  };

  const handleDelete = (id: string) => {
    deleteRequest(id);
    setSelectedRequest(null);
    toast.success('Request deleted');
  };

  const handleConvertToCRM = (id: string) => {
    convertRequestToCRM(id);
    setSelectedRequest(null);
    toast.success('Converted to CRM');
  };

  return (
    <AdminLayout title={getTranslation(t, 'admin.requests.title')}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.requests.total')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.requests.new')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.new}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.requests.inProgress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">{getTranslation(t, 'admin.requests.all')}</TabsTrigger>
          <TabsTrigger value="new">{getTranslation(t, 'admin.requests.new')}</TabsTrigger>
          <TabsTrigger value="in-progress">{getTranslation(t, 'admin.requests.inProgress')}</TabsTrigger>
          <TabsTrigger value="done">{getTranslation(t, 'admin.requests.done')}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {getTranslation(t, 'admin.requests.empty')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{getTranslation(t, 'admin.overview.contact')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.requests.message')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.overview.date')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.overview.status')}</TableHead>
                  <TableHead>{getTranslation(t, 'admin.requests.files')}</TableHead>
                  <TableHead className="text-right">{getTranslation(t, 'admin.requests.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="font-medium">{request.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.email || request.phone || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate text-sm text-muted-foreground">
                        {request.message || 'No message'}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(request.createdAt, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(request.status) as any}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.files && request.files.length > 0 && (
                        <Badge variant="outline" className="gap-1">
                          <FileText className="w-3 h-3" />
                          {request.files.length}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedRequest(request)}
                          title={getTranslation(t, 'admin.requests.view')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleConvertToCRM(request.id)}
                          title={getTranslation(t, 'admin.requests.convertToCrm')}
                        >
                          <Repeat className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(request.id)}
                          title={getTranslation(t, 'admin.requests.delete')}
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

      {/* Detail Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{getTranslation(t, 'admin.requests.detail.title')}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {getTranslation(t, 'admin.requests.detail.fullName')}
                  </div>
                  <div>{selectedRequest.fullName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {getTranslation(t, 'admin.requests.detail.company')}
                  </div>
                  <div>{selectedRequest.company || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {getTranslation(t, 'admin.requests.detail.email')}
                  </div>
                  <div>{selectedRequest.email || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {getTranslation(t, 'admin.requests.detail.phone')}
                  </div>
                  <div>{selectedRequest.phone || 'N/A'}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  {getTranslation(t, 'admin.requests.detail.message')}
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  {selectedRequest.message || 'No message'}
                </div>
              </div>

              {selectedRequest.files && selectedRequest.files.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {getTranslation(t, 'admin.requests.attachments')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.files.map((file, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors pr-1 flex items-center gap-1"
                        onClick={() => handleFileDownload(file)}
                      >
                        <span>{file.name}</span>
                        <Download className="h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {getTranslation(t, 'admin.requests.detail.updateStatus')}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedRequest.status === 'new' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'new')}
                  >
                    {getTranslation(t, 'admin.requests.new')}
                  </Button>
                  <Button
                    variant={selectedRequest.status === 'in-progress' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'in-progress')}
                  >
                    {getTranslation(t, 'admin.requests.inProgress')}
                  </Button>
                  <Button
                    variant={selectedRequest.status === 'done' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'done')}
                  >
                    {getTranslation(t, 'admin.requests.done')}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  {getTranslation(t, 'admin.requests.detail.close')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
