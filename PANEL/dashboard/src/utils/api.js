import { getCsrfToken } from './csrf';

const API_BASE = 'http://localhost:3001/api';
export const socket = io('http://localhost:3001');

async function withCsrf(options = {}) {
  const csrfToken = await getCsrfToken();
  return {
    ...options,
    headers: {
      ...(options.headers || {}),
      'csrf-token': csrfToken,
    },
    credentials: 'include',
  };
}

export async function startBot() {
  const res = await fetch(`${API_BASE}/bot/start`, await withCsrf({ method: 'POST' }));
  return await res.json();
}
export async function stopBot() {
  const res = await fetch(`${API_BASE}/bot/stop`, await withCsrf({ method: 'POST' }));
  return await res.json();
}
export async function restartBot() {
  const res = await fetch(`${API_BASE}/bot/restart`, await withCsrf({ method: 'POST' }));
  return await res.json();
}
export async function getAdminUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, await withCsrf());
  return await res.json();
}
export async function grantPremium(userId) {
  const res = await fetch(`${API_BASE}/admin/grant-premium`, await withCsrf({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }));
  return await res.json();
}
