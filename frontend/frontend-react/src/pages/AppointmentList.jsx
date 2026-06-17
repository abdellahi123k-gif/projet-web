import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rendezvousService } from '../services/api';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useNotification } from '../hooks/useNotification';

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

export default function AppointmentList() {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0, number: 0 });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const loading = !ready;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const params = { page, size: 10 };
        if (search) params.nomClient = search;
        if (status) params.statut = status;
        const res = await rendezvousService.getAll(params);
        if (!cancelled) {
          setData(res.data);
          setError(null);
        }
      } catch {
        if (!cancelled) setError(t('list.loadError'));
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, [page, search, status, refreshKey, t]);

  const handleSearch = (v) => { setSearch(v); setPage(0); };
  const handleStatus = (v) => { setStatus(v); setPage(0); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await rendezvousService.delete(deleteTarget.id);
      showNotification(t('list.deleteSuccess'));
      setDeleteTarget(null);
      setRefreshKey((k) => k + 1);
    } catch {
      showNotification(t('list.deleteError'), 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{t('list.title')}</h1>
        <Link to="/rendez-vous/ajouter" className="btn btn-primary">{t('list.newBtn')}</Link>
      </div>

      <ErrorAlert message={error} onClose={() => setError(null)} />

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-5">
              <SearchBar onSearch={handleSearch} placeholder={t('common.search')} />
            </div>
            <div className="col-12 col-md-3">
              <StatusFilter value={status} onChange={handleStatus} />
            </div>
            <div className="col-12 col-md-4">
              <span className="text-muted small">{t('list.resultCount', { count: data.totalElements })}</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.content.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">{t('list.empty')}</p>
          <Link to="/rendez-vous/ajouter" className="btn btn-primary">{t('list.createFirst')}</Link>
        </div>
      ) : (
        <>
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>{t('common.table.client')}</th>
                    <th>{t('common.table.telephone')}</th>
                    <th>{t('common.table.date')}</th>
                    <th>{t('common.table.heure')}</th>
                    <th>{t('common.table.statut')}</th>
                    <th className="text-end">{t('common.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.content.map((r) => (
                    <tr key={r.id}>
                      <td className="fw-medium">{r.nomClient}</td>
                      <td>{r.telephone}</td>
                      <td>{r.dateRendezVous}</td>
                      <td>{r.heureRendezVous}</td>
                      <td>{getBadge(r.statut)}</td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/rendez-vous/${r.id}`} className="btn btn-outline-info" title={t('common.details')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                          </Link>
                          <Link to={`/rendez-vous/modifier/${r.id}`} className="btn btn-outline-primary" title={t('common.modifier')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                          </Link>
                          <button className="btn btn-outline-danger" title={t('common.supprimer')} onClick={() => setDeleteTarget(r)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3">
            <Pagination page={data.number} totalPages={data.totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <DeleteModal
        show={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        appointment={deleteTarget}
        loading={deleting}
      />
    </>
  );
}
