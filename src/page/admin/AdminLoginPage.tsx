// Meridian Growth Advisory - Admin Login Page

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AdminLoginPage() {
  const { currentLanguage, login, isAuthenticated, contentOverrides } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;
  const [error, setError] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: LoginFormValues) => {
    const success = login(data.username, data.password);
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      form.handleSubmit(onSubmit)();
    }
  };

  const logoText = contentOverrides.logoText || 'Meridian';

  return (
    <div className="min-h-screen navy-grid-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center bg-[#11599700] bg-none">
          <div className="text-2xl font-bold mb-2">{logoText}</div>
          <CardTitle>{getTranslation(t, 'admin.login.title')}</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#12395c] bg-none">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {getTranslation(t, 'admin.login.error')}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.login.username')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onKeyPress={handleKeyPress}
                        autoComplete="username"
                        className="bg-[#d4e0ea3d] bg-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation(t, 'admin.login.password')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        onKeyPress={handleKeyPress}
                        autoComplete="current-password"
                        className="bg-[#d4e1ec73] bg-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {getTranslation(t, 'admin.login.submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
