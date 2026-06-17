import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="text-center py-5">
      <h1 className="display-1 text-muted">404</h1>
      <h2 className="h4 mb-3">{t('notFound.title')}</h2>
      <p className="text-muted mb-4">{t('notFound.message')}</p>
      <Link to="/" className="btn btn-primary">{t('notFound.backHome')}</Link>
    </div>
  );
}
