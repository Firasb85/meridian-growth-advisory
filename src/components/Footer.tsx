// Meridian Growth Advisory - Footer Component

import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function Footer() {
  const { currentLanguage, contentOverrides, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;

  const logoText = contentOverrides.logoText || 'Meridian';
  const footerDesc = contentOverrides.footerDescription || getTranslation(t, 'footer.description');

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <div>
            <h3 className="text-xl font-bold mb-3">{logoText}</h3>
            <p className="text-sm text-secondary-foreground/80">{footerDesc}</p>
          </div>

          {/* Column 2: Expertise */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {getTranslation(t, 'nav.expertise')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {getTranslation(t, 'nav.expertise')}
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {getTranslation(t, 'nav.industries')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {getTranslation(t, 'footer.about')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {getTranslation(t, 'footer.talkToAdvisor')}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${contentOverrides.contactEmail || 'contact@meridian.com'}`}
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  {contentOverrides.contactEmail || 'contact@meridian.com'}
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            {getTranslation(t, 'footer.copyright')}
          </p>
          <button
            type="button"
            onClick={handleAdminClick}
            className="text-xs text-secondary-foreground/20 hover:text-secondary-foreground/40 transition-colors"
          >
            admin
          </button>
        </div>
      </div>
    </footer>
  );
}
