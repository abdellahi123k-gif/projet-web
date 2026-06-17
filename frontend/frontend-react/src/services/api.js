import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (config.data && config.data.heureRendezVous) {
    const time = config.data.heureRendezVous;
    if (time.length === 5) {
      config.data.heureRendezVous = time + ':00';
    }
  }
  return config;
});

export const rendezvousService = {
  getAll: (params) => api.get('/rendezvous', { params }),
  getById: (id) => api.get(`/rendezvous/${id}`),
  create: (data) => api.post('/rendezvous', data),
  update: (id, data) => api.put(`/rendezvous/${id}`, data),
  delete: (id) => api.delete(`/rendezvous/${id}`),
};

export default api;
