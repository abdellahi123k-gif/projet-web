import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rendezvousService } from '../services/api';
import { useNotification } from '../hooks/useNotification';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import PhoneInput from '../components/PhoneInput';

export default function EditAppointment() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await rendezvousService.getById(id);
        const a = res.data;
        setForm({
          nomClient: a.nomClient || '',
          telephone: a.telephone || '',
          dateRendezVous: a.dateRendezVous || '',
          heureRendezVous: a.heureRendezVous || '',
          statut: a.statut || 'EN_ATTENTE',
        });
      } catch {
        setApiError(t('edit.loadError'));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, t]);

  const validate = () => {
    const errs = {};
    if (!form.nomClient.trim()) errs.nomClient = t('form.required.nomClient');
    if (!form.telephone.trim()) errs.telephone = t('form.required.telephone');
    else if (form.telephone.replace(/\D/g, '').length < 4) errs.telephone = t('form.telephone.invalid');
    if (!form.dateRendezVous) errs.dateRendezVous = t('form.required.date');
    if (!form.heureRendezVous) errs.heureRendezVous = t('form.required.heure');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhoneChange = (full) => {
    setForm((prev) => ({ ...prev, telephone: full }));
    if (errors.telephone) setErrors((prev) => ({ ...prev, telephone: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError(null);
    try {
      await rendezvousService.update(id, { ...form, nomClient: form.nomClient.trim(), telephone: form.telephone.trim() });
      showNotification(t('edit.success'));
      navigate('/rendez-vous');
    } catch (err) {
      const detail = err.response?.data;
      if (detail?.details) {
        setApiError(`${detail.error}: ${Object.values(detail.details).join('. ')}`);
      } else {
        setApiError(detail?.error || t('edit.error'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-4">{t('edit.title')}</h1>
      <ErrorAlert message={apiError} onClose={() => setApiError(null)} />

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="nomClient">{t('form.nomClient')}</label>
                <input id="nomClient" name="nomClient"
                  className={`form-control${errors.nomClient ? ' is-invalid' : ''}`}
                  value={form.nomClient} onChange={handleChange} />
                {errors.nomClient && <div className="invalid-feedback">{errors.nomClient}</div>}
              </div>
              <div className="col-12 col-md-6">
                <PhoneInput value={form.telephone} onChange={handlePhoneChange} error={errors.telephone} />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="dateRendezVous">{t('form.date')}</label>
                <input id="dateRendezVous" name="dateRendezVous" type="date"
                  className={`form-control${errors.dateRendezVous ? ' is-invalid' : ''}`}
                  value={form.dateRendezVous} onChange={handleChange} />
                {errors.dateRendezVous && <div className="invalid-feedback">{errors.dateRendezVous}</div>}
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="heureRendezVous">{t('form.heure')}</label>
                <input id="heureRendezVous" name="heureRendezVous" type="time"
                  className={`form-control${errors.heureRendezVous ? ' is-invalid' : ''}`}
                  value={form.heureRendezVous} onChange={handleChange} />
                {errors.heureRendezVous && <div className="invalid-feedback">{errors.heureRendezVous}</div>}
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="statut">{t('form.statut')}</label>
                <select id="statut" name="statut" className="form-select" value={form.statut} onChange={handleChange}>
                  <option value="EN_ATTENTE">{t('form.statut.enAttente')}</option>
                  <option value="CONFIRME">{t('form.statut.confirme')}</option>
                  <option value="ANNULE">{t('form.statut.annule')}</option>
                  <option value="TERMINE">{t('form.statut.termine')}</option>
                </select>
              </div>
            </div>
            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                {t('edit.submit')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/rendez-vous')}>
                {t('edit.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
