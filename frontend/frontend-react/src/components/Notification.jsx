import { useNotification } from '../hooks/useNotification';
import { useTranslation } from 'react-i18next';

export default function NotificationToast() {
  const { t } = useTranslation();
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  const bg = notification.type === 'success' ? 'bg-success' : 'bg-danger';

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show text-white ${bg}`} role="alert">
        <div className={`toast-header text-white ${bg}`}>
          <strong className="me-auto">
            {notification.type === 'success' ? t('notification.success') : t('notification.error')}
          </strong>
          <button type="button" className="btn-close btn-close-white" onClick={hideNotification}></button>
        </div>
        <div className="toast-body">{notification.message}</div>
      </div>
    </div>
  );
}
