// utils/http.js
import axios from 'axios';

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

export const api = axios.create({ 
  baseURL: `${BACKEND_ORIGIN}/api/v1`,
  withCredentials: true 
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const m = document.cookie.split('; ').find(c => c.startsWith('csrftoken='));
  if (m) config.headers['X-CSRFToken'] = m.split('=')[1];
  return config;
});

export async function ensureCsrf() {
  try { 
    await api.get('/auth/csrf/'); 
  } catch (error) {
    console.log('CSRF token fetch failed:', error);
  }
}
