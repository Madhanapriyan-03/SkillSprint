import api from './api';

const getAll = async (page = 0, size = 10) => {
  const response = await api.get(`/roadmaps?page=${page}&size=${size}`);
  return response.data;
};

const create = async (roadmapData) => {
  const response = await api.post('/roadmaps', roadmapData);
  return response.data;
};

const update = async (id, roadmapData) => {
  const response = await api.put(`/roadmaps/${id}`, roadmapData);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/roadmaps/${id}`);
  return response.data;
};

const publish = async (id) => {
  const response = await api.put(`/roadmaps/${id}/publish`);
  return response.data;
};

const roadmapService = { getAll, create, update, remove, publish };
export default roadmapService;