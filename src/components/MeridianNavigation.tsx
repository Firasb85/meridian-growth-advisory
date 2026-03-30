import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { Menu, X } from 'lucide-react';

export function MeridianNavigation() {
  const { currentLanguage, languages, setLanguage, contentOverrides } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = translations[currentLanguage] || translations.en;
  const enabledLanguages = languages.filter(lang => lang.enabled);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      navigate(path);
      setMobileOpen(false);
    }
  };

  const logoText = contentOverrides.logoText || 'Meridian';

  const navItems = [
    { label: getTranslation(t, 'nav.outcomes'), sectionId: 'outcomes' },
    { label: getTranslation(t, 'nav.services'), path: '/services' },
    { label: getTranslation(t, 'nav.industries'), path: '/industries' },
    { label: getTranslation(t, 'nav.about'), path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold gradient-text">
          {logoText}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path || '/', item.sectionId)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 border border-border rounded-md px-1">
            {enabledLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>

          {/* CTA */}
          <Button
            size="sm"
            onClick={() => navigate('/contact')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {getTranslation(t, 'nav.cta')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path || '/', item.sectionId)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-start"
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-1">
              {enabledLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              onClick={() => { navigate('/contact'); setMobileOpen(false); }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              {getTranslation(t, 'nav.cta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
