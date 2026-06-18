import { useEffect, useState } from 'react';
import { DEFAULT_LANG, LANG_STORAGE_KEY, type Lang } from '../lib/i18n';

type LabelT = string | { ru: string; en: string };
export interface NavLink {
  href: string;
  label: LabelT;
  contact?: boolean; // opens the contact modal instead of navigating
}

interface Props {
  brandName: string;
  brandSuffix: string;
  breadcrumb?: { ru: string; en: string };
  navLinks: NavLink[];
  menuLinks: NavLink[];
  cta?: { ru: string; en: string };
}

function Label({ value }: { value: LabelT }) {
  if (typeof value === 'string') return <>{value}</>;
  return (
    <>
      <span data-lang="ru">{value.ru}</span>
      <span data-lang="en">{value.en}</span>
    </>
  );
}

export default function SiteNav({ brandName, brandSuffix, breadcrumb, navLinks, menuLinks, cta }: Props) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync the language toggle's active state with the current <html lang>.
  useEffect(() => {
    const stored = (localStorage.getItem(LANG_STORAGE_KEY) as Lang) || DEFAULT_LANG;
    setLang(stored);
    document.documentElement.setAttribute('lang', stored);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function changeLang(next: Lang) {
    setLang(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    document.documentElement.setAttribute('lang', next);
  }

  const contactProps = (link: NavLink) =>
    link.contact ? { 'data-contact': true } : {};

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-logo">
          {brandName}
          <span>{brandSuffix}</span>
        </a>
        {breadcrumb && (
          <span className="nav-breadcrumb">
            <span data-lang="ru">{breadcrumb.ru}</span>
            <span data-lang="en">{breadcrumb.en}</span>
          </span>
        )}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href + JSON.stringify(link.label)}>
              <a href={link.href} {...contactProps(link)}>
                <Label value={link.label} />
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="lang-toggle">
            <button className={lang === 'ru' ? 'active' : ''} onClick={() => changeLang('ru')}>
              RU
            </button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>
              EN
            </button>
          </div>
          {cta && (
            <a href="#contact" className="nav-cta" data-contact>
              <Label value={cta} />
            </a>
          )}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {menuLinks.map((link) => (
          <a
            key={link.href + JSON.stringify(link.label)}
            href={link.href}
            {...contactProps(link)}
            className={link.contact ? 'mobile-cta' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <Label value={link.label} />
          </a>
        ))}
        <div className="mobile-lang">
          <button className={lang === 'ru' ? 'active' : ''} onClick={() => changeLang('ru')}>
            RU
          </button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>
            EN
          </button>
        </div>
      </div>
    </>
  );
}
