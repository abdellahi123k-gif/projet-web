import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="bg-light py-3 text-center text-muted small border-top">
        <span dangerouslySetInnerHTML={{ __html: t('footer.copyright', { year: new Date().getFullYear() }) }} />
      </footer>
    </div>
  );
}
