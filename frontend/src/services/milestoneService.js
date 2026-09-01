import api from './api';

const getByRoadmap = async (roadmapId) => {
  const response = await api.get(`/milestones?roadmapId=${roadmapId}&page=0&size=20`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/milestones', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/milestones/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/milestones/${id}`);
  return response.data;
};

export default {
  getByRoadmap,
  create,
  update,
  remove
};