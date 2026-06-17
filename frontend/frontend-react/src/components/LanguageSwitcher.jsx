import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="dropdown">
      <button className="btn btn-sm btn-outline-light dropdown-toggle" type="button"
        data-bs-toggle="dropdown" aria-expanded="false">
        {LANGUAGES.find((l) => l.code === i18n.language)?.label || 'Français'}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {LANGUAGES.map((l) => (
          <li key={l.code}>
            <button className={`dropdown-item${i18n.language === l.code ? ' active' : ''}`}
              onClick={() => i18n.changeLanguage(l.code)}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
