import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isActive = (path) => pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          {t('app.title')}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={isActive('/')} to="/">{t('nav.dashboard')}</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/rendez-vous')} to="/rendez-vous">{t('nav.list')}</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/rendez-vous/ajouter')} to="/rendez-vous/ajouter">{t('nav.new')}</Link>
            </li>
          </ul>
          <div className="d-flex">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
