import api from './api';

const getAll = async (page = 0, size = 10) => {
  const response = await api.get(`/submissions?page=${page}&size=${size}`);
  return response.data;
};

const create = async (submissionData) => {
  const response = await api.post('/submissions', submissionData);
  return response.data;
};

const update = async (id, submissionData) => {
  const response = await api.put(`/submissions/${id}`, submissionData);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/submissions/${id}`);
  return response.data;
};

const grade = async (id, gradeData) => {
  const response = await api.put(`/submissions/${id}/grade`, gradeData);
  return response.data;
};

const submissionService = { getAll, create, update, remove, grade };
export default submissionService;
