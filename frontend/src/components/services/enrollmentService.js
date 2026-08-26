import api from './api';

const getAll = async (page = 0, size = 10) => {
  const response = await api.get(`/enrollments?page=${page}&size=${size}`);
  return response.data;
};

const create = async (enrollmentData) => {
  const response = await api.post('/enrollments', enrollmentData);
  return response.data;
};

const update = async (id, enrollmentData) => {
  const response = await api.put(`/enrollments/${id}`, enrollmentData);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/enrollments/${id}`);
  return response.data;
};

const drop = async (id) => {
  const response = await api.put(`/enrollments/${id}/drop`);
  return response.data;
};

const enrollmentService = { getAll, create, update, remove, drop };
export default enrollmentService;
