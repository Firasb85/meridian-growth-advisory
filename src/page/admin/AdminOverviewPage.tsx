// Meridian Growth Advisory - Admin Overview Panel

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { format } from 'date-fns';

export function AdminOverviewPage() {
  const { currentLanguage, requests, crmEntries, languages, contentOverrides } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;

  const newRequestsCount = requests.filter(r => r.status === 'new').length;
  const contentAreasCount = Object.keys(contentOverrides).filter(key => contentOverrides[key as keyof typeof contentOverrides]).length;

  const recentRequests = requests.slice(0, 5);

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'default',
      'in-progress': 'secondary',
      done: 'outline',
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  return (
    <AdminLayout title={getTranslation(t, 'admin.overview.title')}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/requests')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.overview.newRequests')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newRequestsCount}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/crm')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.overview.customers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{crmEntries.length}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/languages')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.overview.languages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{languages.filter(l => l.enabled).length}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/content')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {getTranslation(t, 'admin.overview.contentAreas')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contentAreasCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(t, 'admin.overview.recentRequests')}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {getTranslation(t, 'admin.requests.empty')}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{getTranslation(t, 'admin.overview.contact')}</TableHead>
                    <TableHead>{getTranslation(t, 'admin.overview.date')}</TableHead>
                    <TableHead>{getTranslation(t, 'admin.overview.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((request) => (
                    <TableRow key={request.id} className="cursor-pointer" onClick={() => navigate('/admin/requests')}>
                      <TableCell>
                        <div className="font-medium">{request.fullName}</div>
                        <div className="text-sm text-muted-foreground">{request.email || request.phone}</div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(request.createdAt, 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(request.status) as any}>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* All Customers */}
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(t, 'admin.overview.allCustomers')}</CardTitle>
          </CardHeader>
          <CardContent>
            {crmEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {getTranslation(t, 'admin.crm.empty')}
              </div>
            ) : (
              <div className="space-y-4">
                {crmEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => navigate('/admin/crm')}
                  >
                    <Avatar>
                      <AvatarFallback>{entry.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{entry.fullName}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {entry.company || entry.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
