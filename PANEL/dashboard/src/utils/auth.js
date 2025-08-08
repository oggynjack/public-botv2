// Utility for Discord OAuth2 authentication and role-based access
export async function getUserSession() {
  // Example: fetch session from backend
  const res = await fetch('/api/auth/session');
  if (!res.ok) return null;
  return await res.json();
}

export function hasRole(user, role) {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

export function isAdmin(user) {
  return user && user.id === process.env.BOTCREATOR_ID;
}
