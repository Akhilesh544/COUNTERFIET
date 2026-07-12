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
  register: (payload: { name: string; email: string; password: string }) =>
    api.post("/api/auth/register", payload),

  login: (payload: { email: string; password: string }) =>
    api.post("/api/auth/login", payload),
};

export const userApi = {
  getProfile: () => api.get("/api/user/profile"),
};

export const analyzeApi = {
  analyzeText: (text: string) =>
    api.post("/api/analyze/text", { text }),

  analyzeAudio: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/analyze/audio", formData);
  },

  analyzeImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/analyze/image", formData);
  },

  getHistory: () => api.get("/api/analyze/history"),
};
export default api;