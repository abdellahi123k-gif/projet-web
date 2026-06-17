import { useState, useCallback } from 'react';
import { rendezvousService } from '../services/api';

export function useRendezVous() {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0, number: 0 });
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rendezvousService.getAll(params);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rendezvousService.getById(id);
      setAppointment(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rendezvousService.create(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rendezvousService.update(id, payload);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await rendezvousService.delete(id);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, appointment, loading, error, fetchAll, fetchById, create, update, remove };
}
