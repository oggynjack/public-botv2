// Utility to fetch CSRF token from backend
export async function getCsrfToken() {
  const res = await fetch('http://localhost:3001/api/csrf-token', { credentials: 'include' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.csrfToken;
}
