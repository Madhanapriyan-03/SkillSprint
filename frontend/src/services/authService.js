import api from './api';

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('sprint_token', response.data.token);
    localStorage.setItem('sprint_role', response.data.role);
  }
  return response.data;
};

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('sprint_token');
  localStorage.removeItem('sprint_role');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
