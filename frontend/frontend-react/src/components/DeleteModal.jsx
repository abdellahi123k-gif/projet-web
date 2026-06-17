import { useTranslation } from 'react-i18next';

export default function DeleteModal({ show, onClose, onConfirm, appointment, loading }) {
  const { t } = useTranslation();
  if (!show) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">{t('delete.title')}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p dangerouslySetInnerHTML={{ __html: t('delete.body', { nom: appointment?.nomClient }) }} />
            <p className="text-muted mb-0">{t('common.confirmer')}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              {t('common.annuler')}
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
              {loading ? t('delete.deleting') : t('delete.confirmBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
