import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function MeridianFooter() {
  const { currentLanguage, contentOverrides, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;

  const logoText = contentOverrides.logoText || 'Meridian';
  const footerDesc = contentOverrides.footerDescription || getTranslation(t, 'footer.description');

  return (
    <footer className="bg-secondary border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">{logoText}</h3>
            <p className="text-sm text-muted-foreground">{footerDesc}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {getTranslation(t, 'footer.services')}
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {getTranslation(t, 'footer.about')}
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {getTranslation(t, 'footer.talkToAdvisor')}
            </Link>
          </div>

          {/* Admin Link */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate(isAuthenticated ? '/admin' : '/admin/login')}
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors text-start"
            >
              Admin
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {getTranslation(t, 'footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
