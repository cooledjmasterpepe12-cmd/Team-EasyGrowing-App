import { useState, useEffect } from 'react';
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

export default function App() {
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const Page = ROUTES[path] || Dashboard;

  return (
    <Layout currentPath={path}>
      <Page key={path} />
    </Layout>
  );
}
