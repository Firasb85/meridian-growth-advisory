// Meridian Growth Advisory - Route Configuration

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminCRMPage } from './pages/admin/AdminCRMPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminLanguagesPage } from './pages/admin/AdminLanguagesPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  protected?: boolean;
}

const routes: RouteConfig[] = [
  // Public Routes
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    name: 'Services',
    path: '/services',
    element: <ServicesPage />,
  },
  {
    name: 'Industries',
    path: '/industries',
    element: <IndustriesPage />,
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />,
  },
  // Admin Routes
  {
    name: 'Admin Login',
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    name: 'Admin Overview',
    path: '/admin',
    element: <AdminOverviewPage />,
    protected: true,
  },
  {
    name: 'Admin Requests',
    path: '/admin/requests',
    element: <AdminRequestsPage />,
    protected: true,
  },
  {
    name: 'Admin CRM',
    path: '/admin/crm',
    element: <AdminCRMPage />,
    protected: true,
  },
  {
    name: 'Admin Content',
    path: '/admin/content',
    element: <AdminContentPage />,
    protected: true,
  },
  {
    name: 'Admin Languages',
    path: '/admin/languages',
    element: <AdminLanguagesPage />,
    protected: true,
  },
];

export default routes;
