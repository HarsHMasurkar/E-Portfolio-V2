/**
 * API Service Layer
 * Centralized Axios requests to the backend REST API
 */

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Network Error';
    return Promise.reject(new Error(message));
  }
);

// ─── Projects API ────────────────────────────────────────────────────────────
export const projectsAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ─── Skills API ───────────────────────────────────────────────────────────────
export const skillsAPI = {
  getAll: (params = {}) => api.get('/skills', { params }),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

// ─── Contact API ──────────────────────────────────────────────────────────────
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
};

// ─── Profile API ──────────────────────────────────────────────────────────────
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

export default api;
