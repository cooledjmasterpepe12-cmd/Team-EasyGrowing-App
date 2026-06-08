import { useState, useEffect } from 'react';
import { useAuth } from './core/auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Diary from './pages/Diary';
import Bible from './pages/Bible';
import Tools from './pages/Tools';
import Genetics from './pages/Genetics';
import Community from './pages/Community';
import Music from './pages/Music';
import Shop from './pages/Shop';
import Extraction from './pages/Extraction';
import Diy from './pages/Diy';
import IoT from './pages/IoT';
import Doctor from './pages/Doctor';
import B2B from './pages/B2B';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';

const ROUTES = {
  '/': Dashboard,
  '/register': Register,
  '/diary': Diary,
  '/bible': Bible,
  '/tools': Tools,
  '/genetics': Genetics,
  '/community': Community,
  '/music': Music,
  '/shop': Shop,
  '/extraction': Extraction,
  '/diy': Diy,
  '/iot': IoT,
  '/doctor': Doctor,
  '/b2b': B2B,
  '/admin': Admin,
  '/profile': Profile,
  '/achievements': Achievements,
};

const PROTECTED_ROUTES = new Set([
  '/', '/diary', '/bible', '/tools', '/genetics', '/community', '/music',
  '/shop', '/extraction', '/diy', '/iot', '/doctor', '/b2b', '/admin', '/profile', '/achievements'
]);

export default function App() {
  const { isLoggedIn, loading } = useAuth();
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  // Wait for auth to load before deciding which page to show
  if (loading) {
    return (
      <Layout currentPath="/register">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ color: '#00ff00', fontFamily: 'monospace', fontSize: '14px' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  // If not logged in and trying to access protected route, redirect to register
  const isProtected = PROTECTED_ROUTES.has(path);
  if (!isLoggedIn && isProtected) {
    window.location.hash = '#/register';
    return (
      <Layout currentPath="/register">
        <Register key="/register" />
      </Layout>
    );
  }

  const Page = ROUTES[path] || Dashboard;

  return (
    <Layout currentPath={path}>
      <Page key={path} />
    </Layout>
  );
}
