// Meridian Growth Advisory - Main Application Component

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import routes from './routes';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {routes.map((route, index) => {
            const isAdminRoute = route.path.startsWith('/admin');
            const element = route.protected ? (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            ) : route.element;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAdminRoute ? (
                    element
                  ) : (
                    <>
                      <Navigation />
                      <main className="flex-grow">{element}</main>
                      <Footer />
                    </>
                  )
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
