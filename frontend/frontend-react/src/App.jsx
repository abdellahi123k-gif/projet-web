import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './hooks/useNotification';
import NotificationToast from './components/Notification';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AppRoutes />
        <NotificationToast />
      </NotificationProvider>
    </BrowserRouter>
  );
}
