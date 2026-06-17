import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rendezvousService } from '../services/api';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

function getBadge(statut) {
  const map = {
    EN_ATTENTE: ['warning', 'En attente'],
    CONFIRME: ['success', 'Confirmé'],
    ANNULE: ['danger', 'Annulé'],
    TERMINE: ['info', 'Terminé'],
  };
  const [color, label] = map[statut] || ['secondary', statut];
  return <span className={`badge bg-${color}`}>{label}</span>;
}

const icons = {
  total: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3 1.5a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>,
  enAttente: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>,
  confirme: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>,
  termine: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>,
  annule: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>,
};

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ total: 0, enAttente: 0, confirme: 0, termine: 0, annule: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await rendezvousService.getAll({ page: 0, size: 100 });
        const items = res.data.content || [];
        setRecent(items.slice(0, 5));
        setStats({
          total: res.data.totalElements || items.length,
          enAttente: items.filter((a) => a.statut === 'EN_ATTENTE').length,
          confirme: items.filter((a) => a.statut === 'CONFIRME').length,
          termine: items.filter((a) => a.statut === 'TERMINE').length,
          annule: items.filter((a) => a.statut === 'ANNULE').length,
        });
      } catch {
        setError(t('dashboard.error'));
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{t('dashboard.title')}</h1>
        <Link to="/rendez-vous/ajouter" className="btn btn-primary">{t('dashboard.newBtn')}</Link>
      </div>

      <ErrorAlert message={error} onClose={() => setError(null)} />

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-2">
          <StatCard title={t('dashboard.total')} value={stats.total} color="primary" icon={icons.total} />
        </div>
        <div className="col-12 col-sm-6 col-xl-2">
          <StatCard title={t('dashboard.enAttente')} value={stats.enAttente} color="warning" icon={icons.enAttente} />
        </div>
        <div className="col-12 col-sm-6 col-xl-2">
          <StatCard title={t('dashboard.confirme')} value={stats.confirme} color="success" icon={icons.confirme} />
        </div>
        <div className="col-12 col-sm-6 col-xl-2">
          <StatCard title={t('dashboard.termine')} value={stats.termine} color="info" icon={icons.termine} />
        </div>
        <div className="col-12 col-sm-6 col-xl-2">
          <StatCard title={t('dashboard.annule')} value={stats.annule} color="danger" icon={icons.annule} />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t('dashboard.recent')}</h5>
          <Link to="/rendez-vous" className="btn btn-sm btn-outline-primary">{t('dashboard.viewAll')}</Link>
        </div>
        <div className="card-body p-0">
          {recent.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">{t('dashboard.noData')}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>{t('common.table.client')}</th>
                    <th>{t('common.table.telephone')}</th>
                    <th>{t('common.table.date')}</th>
                    <th>{t('common.table.heure')}</th>
                    <th>{t('common.table.statut')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id}>
                      <td>{r.nomClient}</td>
                      <td>{r.telephone}</td>
                      <td>{r.dateRendezVous}</td>
                      <td>{r.heureRendezVous}</td>
                      <td>{getBadge(r.statut)}</td>
                      <td>
                        <Link to={`/rendez-vous/${r.id}`} className="btn btn-sm btn-outline-secondary">{t('common.details')}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
