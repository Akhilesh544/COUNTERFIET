import axios from 'axios';

const api = axios.create({
  baseURL: 'https://counterfiet.onrender.com',
});

export const setAuthToken = (token?: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('scamshield-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (payload: { name: string; email: string; password: string }) => api.post('/auth/register', payload),
  login: (payload: { email: string; password: string }) => api.post('/auth/login', payload),
};

export const userApi = {
  getProfile: () => api.get('/user/profile'),
};

export const analyzeApi = {
  analyzeText: (text: string) => api.post('/analyze/text', { text }),
  analyzeAudio: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/analyze/audio', formData);
  },
  analyzeImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/analyze/image', formData);
  },
  getHistory: () => api.get('/analyze/history'),
};

export default api;