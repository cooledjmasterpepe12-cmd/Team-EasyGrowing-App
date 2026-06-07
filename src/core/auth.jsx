import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('eg_session'));
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn && session) setUser(session);
    } catch {}
    setLoading(false);
  }, []);

  const signup = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('eg_users') || '[]');
    if (users.find(u => u.email === email)) return { ok: false, err: 'email_exists' };
    if (users.find(u => u.username === username)) return { ok: false, err: 'username_exists' };
    if (password.length < 6) return { ok: false, err: 'weak_password' };
    const u = { id: Date.now().toString(36), username, email, password, created: Date.now() };
    users.push(u);
    localStorage.setItem('eg_users', JSON.stringify(users));
    const session = { id: u.id, username: u.username, email: u.email };
    localStorage.setItem('eg_session', JSON.stringify(session));
    localStorage.setItem('isLoggedIn', 'true');
    setUser(session);
    return { ok: true, user: session };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('eg_users') || '[]');
    const u = users.find(u => u.email === email && u.password === password);
    if (!u) return { ok: false, err: 'invalid_credentials' };
    const session = { id: u.id, username: u.username, email: u.email };
    localStorage.setItem('eg_session', JSON.stringify(session));
    localStorage.setItem('isLoggedIn', 'true');
    setUser(session);
    return { ok: true, user: session };
  };

  const logout = () => {
    localStorage.removeItem('eg_session');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
