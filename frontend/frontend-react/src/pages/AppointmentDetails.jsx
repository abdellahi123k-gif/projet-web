import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rendezvousService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

function getBadge(statut, large) {
  const map = {
    EN_ATTENTE: ['warning', 'En attente'],
    CONFIRME: ['success', 'Confirmé'],
    ANNULE: ['danger', 'Annulé'],
    TERMINE: ['info', 'Terminé'],
  };
  const [color, label] = map[statut] || ['secondary', statut];
  return <span className={`badge bg-${color}${large ? ' fs-6' : ''}`}>{label}</span>;
}

export default function AppointmentDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await rendezvousService.getById(id);
        setAppointment(res.data);
      } catch {
        setError(t('detail.error'));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, t]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onClose={() => setError(null)} />;
  if (!appointment) return <ErrorAlert message={t('detail.notFound')} />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{t('detail.title')}</h1>
        <div className="d-flex gap-2">
          <Link to={`/rendez-vous/modifier/${appointment.id}`} className="btn btn-primary">{t('detail.editBtn')}</Link>
          <button className="btn btn-secondary" onClick={() => navigate('/rendez-vous')}>{t('detail.backBtn')}</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t('detail.info')}</h5>
          {getBadge(appointment.statut, true)}
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="text-muted small text-uppercase">{t('detail.nomClient')}</label>
              <p className="fs-5 fw-medium">{appointment.nomClient}</p>
            </div>
            <div className="col-12 col-md-6">
              <label className="text-muted small text-uppercase">{t('detail.telephone')}</label>
              <p className="fs-5">{appointment.telephone}</p>
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small text-uppercase">{t('detail.date')}</label>
              <p className="fs-5">{appointment.dateRendezVous}</p>
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small text-uppercase">{t('detail.heure')}</label>
              <p className="fs-5">{appointment.heureRendezVous}</p>
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small text-uppercase">{t('detail.statut')}</label>
              <p>{getBadge(appointment.statut, true)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
