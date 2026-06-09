import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

// Hardcoded admin password for the admin@easygrowing.de user
const ADMIN_PASSWORD = 'TestEasyGrowing';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
        });
        setIsAdmin(session.user.email === 'admin@easygrowing.de');
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
        });
        setIsAdmin(session.user.email === 'admin@easygrowing.de');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) {
      if (error.message.includes('already registered')) return { ok: false, err: 'email_exists' };
      if (error.message.includes('password')) return { ok: false, err: 'weak_password' };
      return { ok: false, err: error.message };
    }
    return { ok: true, user: data.user };
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login')) return { ok: false, err: 'invalid_credentials' };
      return { ok: false, err: error.message };
    }
    return { ok: true, user: data.user };
  };

  const adminLogin = async (password) => {
    if (password !== ADMIN_PASSWORD) {
      return { ok: false, err: 'invalid_password' };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@easygrowing.de',
      password: ADMIN_PASSWORD,
    });
    if (error) {
      return { ok: false, err: error.message };
    }
    return { ok: true, user: data.user };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, adminLogin, logout, isLoggedIn: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
