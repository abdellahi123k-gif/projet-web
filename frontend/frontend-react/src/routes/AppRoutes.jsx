import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import AppointmentList from '../pages/AppointmentList';
import AddAppointment from '../pages/AddAppointment';
import EditAppointment from '../pages/EditAppointment';
import AppointmentDetails from '../pages/AppointmentDetails';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rendez-vous" element={<AppointmentList />} />
        <Route path="/rendez-vous/ajouter" element={<AddAppointment />} />
        <Route path="/rendez-vous/modifier/:id" element={<EditAppointment />} />
        <Route path="/rendez-vous/:id" element={<AppointmentDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
