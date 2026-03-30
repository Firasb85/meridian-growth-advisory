// Meridian Growth Advisory - Admin Layout Component

import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { LayoutDashboard, FileText, Users, FileEdit, Languages, ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: string;
}

export function AdminLayout({ children, title, breadcrumb }: AdminLayoutProps) {
  const { currentLanguage, contentOverrides } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[currentLanguage];

  const logoText = contentOverrides.logoText || 'Meridian';

  const navItems = [
    {
      group: getTranslation(t, 'admin.nav.main'),
      items: [
        { path: '/admin', label: getTranslation(t, 'admin.nav.overview'), icon: LayoutDashboard },
        { path: '/admin/requests', label: getTranslation(t, 'admin.nav.requests'), icon: FileText },
        { path: '/admin/crm', label: getTranslation(t, 'admin.nav.crm'), icon: Users },
      ],
    },
    {
      group: getTranslation(t, 'admin.nav.website'),
      items: [
        { path: '/admin/content', label: getTranslation(t, 'admin.nav.content'), icon: FileEdit },
        { path: '/admin/languages', label: getTranslation(t, 'admin.nav.languages'), icon: Languages },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-[248px] bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0">
        <div className="p-6">
          <div className="text-xl font-bold mb-8">{logoText}</div>

          <nav className="space-y-6">
            {navItems.map((group) => (
              <div key={group.group}>
                <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
                  {group.group}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {getTranslation(t, 'admin.nav.backToSite')}
            </Button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            {breadcrumb && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-muted-foreground">{breadcrumb}</span>
              </>
            )}
          </div>
          <Badge variant="secondary">admin</Badge>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
