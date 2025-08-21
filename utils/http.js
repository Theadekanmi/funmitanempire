// utils/http.js
import axios from 'axios';

export const api = axios.create({ withCredentials: true });

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const m = document.cookie.split('; ').find(c => c.startsWith('csrftoken='));
  if (m) config.headers['X-CSRFToken'] = m.split('=')[1];
  return config;
});

export async function ensureCsrf() {
  try { await api.get('/api/v1/auth/csrf/'); } catch {}
}
