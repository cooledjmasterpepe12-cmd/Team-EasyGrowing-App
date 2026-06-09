import { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';

const NAV_CARDS = [
  { icon: '📖', label: 'Bibel', hash: '/bible' },
  { icon: '📓', label: 'Diary', hash: '/diary' },
  { icon: '🧬', label: 'Genetics', hash: '/genetics' },
  { icon: '📡', label: 'IoT', hash: '/iot' },
  { icon: '🔧', label: 'Tools', hash: '/tools' },
  { icon: '📦', label: 'BBY Box', hash: '/shop' },
  { icon: '🔥', label: 'Extract', hash: '/extraction' },
  { icon: '🪚', label: 'DIY', hash: '/diy' },
  { icon: '🐺', label: 'Community', hash: '/community' },
  { icon: '🎵', label: 'Musik', hash: '/music' },
  { icon: '🩺', label: 'Doctor', hash: '/doctor' },
  { icon: '📊', label: 'B2B', hash: '/b2b' },
  { icon: '🛡', label: 'Admin', hash: '/admin' },
  { icon: '👤', label: 'Profil', hash: '/profile' },
  { icon: '🏆', label: 'Awards', hash: '/achievements' },
  { icon: '🔑', label: 'Login', hash: '/register' },
];

export default function Dashboard() {
  const { t } = useI18n();
  const { formatTemp } = useUnits();
  const { user, isLoggedIn } = useAuth();

  const [temperature, setTemperature] = useState(25.3);
  const [humidity, setHumidity] = useState(59);
  const [ph, setPh] = useState(6.0);

  useEffect(() => {
    const iv = setInterval(() => {
      setTemperature(p => Math.max(18, Math.min(35, p + (Math.random() - 0.5) * 0.3)));
      setHumidity(p => Math.max(30, Math.min(90, p + (Math.random() - 0.5) * 1.5)));
      setPh(p => Math.max(5, Math.min(8, p + (Math.random() - 0.5) * 0.05)));
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#0c1a0c', minHeight: '100vh', padding: '16px', fontFamily: 'monospace' }}>

      {/* Hero - Phoenix Medallion */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/Gemini_Generated_Image_2kqzqb2kqzqb2kqz.png"
            alt="Team EasyGrowing"
            style={{ width: '160px', height: '160px', objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(224,144,16,0.6))' }}
            onError={(e) => { e.target.style.display='none'; }}
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '14px', color: '#6ab86a', textShadow: '0 0 12px rgba(106,184,106,0.7)' }}>
            TEAM EASYGROWING
          </div>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#4a7a4a', marginTop: '6px', letterSpacing: '2px' }}>
            PEPE &amp; MARC VIP CLUB
          </div>
        </div>
      </div>

      {/* System Status Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {/* System ONLINE */}
        <div className="status-card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#7aaa7a', marginBottom: '6px' }}>SYSTEM</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span className="status-online" />
            <span style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '8px', color: '#4caf50' }}>ONLINE</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="status-card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#7aaa7a', marginBottom: '6px' }}>TEMP</div>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '11px', color: '#6ab86a' }}>
            {formatTemp(temperature)}
          </div>
        </div>

        {/* RLF / pH */}
        <div className="status-card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#7aaa7a', marginBottom: '4px' }}>RLF / pH</div>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '9px', color: '#6ab86a' }}>
            {humidity.toFixed(0)}% / {ph.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Grower Profile */}
      <div style={{
        background: 'linear-gradient(145deg, #162816, #0e1e0e)',
        border: '1px solid #2a4a2a',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '9px', color: '#6ab86a', marginBottom: '12px' }}>
          GROWER PROFILE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            border: '2px solid #e09010',
            overflow: 'hidden', flexShrink: 0,
            background: '#0a160a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src="/logoteam.png"
              alt="Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display='none'; }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '9px', color: '#c8e6c9', marginBottom: '4px' }}>
              {isLoggedIn && user ? user.username?.toUpperCase() : 'GAST'}
            </div>
            <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#7aaa7a', marginBottom: '8px' }}>
              XP 8450 / 12.550
            </div>
            {/* XP Bar */}
            <div className="progress-bar" style={{ height: '8px' }}>
              <div className="progress-bar-fill progress-bar-fill-gold" style={{ width: '67%' }} />
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span className="pixel-tag pixel-tag-amber" style={{ fontSize: '7px' }}>LVL 42 PHOENIX</span>
          {isLoggedIn && <span className="pixel-tag" style={{ fontSize: '7px' }}>MEMBER</span>}
        </div>
      </div>

      {/* Navigation Grid */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '8px', color: '#4a7a4a', marginBottom: '12px', letterSpacing: '1px' }}>
          NAVIGATION
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {NAV_CARDS.map((card) => (
            <button
              key={card.hash}
              className="nav-tile"
              onClick={() => window.location.hash = card.hash}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{card.icon}</span>
              <span className="nav-tile-label">{card.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
