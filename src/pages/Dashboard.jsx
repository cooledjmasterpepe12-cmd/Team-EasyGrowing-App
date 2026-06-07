import { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';
import { useDB } from '../core/db';

export default function Dashboard() {
  const { t } = useI18n();
  const { formatTemp, formatVol, formatWater } = useUnits();
  const { user, isLoggedIn } = useAuth();
  const { getAll } = useDB();

  const [temperature, setTemperature] = useState(24.5);
  const [humidity, setHumidity] = useState(58);
  const [waterLevel, setWaterLevel] = useState(75);
  const [xp, setXp] = useState(8450);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => prev + (Math.random() - 0.5) * 0.5);
      setHumidity(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 2)));
      setWaterLevel(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navigationCards = [
    { icon: '📓', label: t('nav.diary'), hash: '/diary' },
    { icon: '📖', label: t('nav.bible'), hash: '/bible' },
    { icon: '🔧', label: t('nav.tools'), hash: '/tools' },
    { icon: '🧬', label: t('nav.genetics'), hash: '/genetics' },
    { icon: '🐺', label: t('nav.community'), hash: '/community' },
    { icon: '🎵', label: t('nav.music'), hash: '/music' },
    { icon: '🛒', label: t('nav.shop'), hash: '/shop' },
    { icon: '🔥', label: t('nav.extract'), hash: '/extraction' },
    { icon: '🪚', label: t('nav.diy'), hash: '/diy' },
    { icon: '📡', label: t('nav.iot'), hash: '/iot' },
    { icon: '🩺', label: t('nav.doctor'), hash: '/doctor' },
    { icon: '📊', label: t('nav.b2b'), hash: '/b2b' },
    { icon: '🛡', label: t('nav.admin'), hash: '/admin' },
    { icon: '👤', label: t('nav.profile'), hash: '/profile' },
    { icon: '🏆', label: t('nav.achievements'), hash: '/achievements' },
    { icon: '🔑', label: t('auth.login'), hash: '/register' },
  ];

  return (
    <div className="dashboard-container" style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h1 className="pixel-h1" style={{ color: '#00ff00', marginBottom: '20px' }}>
        {t('dash.title') || 'PHOENIX HQ'}
      </h1>

      {isLoggedIn && user && (
        <div className="pixel-card" style={{
          backgroundColor: '#1a1a1a',
          borderLeft: '4px solid #00ff00',
          borderTop: '4px solid #00ff00',
          borderRight: '2px solid #00e5ff',
          borderBottom: '2px solid #00e5ff',
          padding: '15px',
          marginBottom: '20px',
        }}>
          <p style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '10px', margin: '0' }}>
            {t('dash.welcome').toUpperCase()}, {user.username?.toUpperCase() || 'PILOT'}
          </p>
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '15px' }}>
          {t('dash.bio')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <div className="pixel-card" style={{
            backgroundColor: '#1a1a1a',
            borderLeft: '3px solid #00ff00',
            borderTop: '3px solid #00ff00',
            borderRight: '2px solid #00e5ff',
            borderBottom: '2px solid #00e5ff',
            padding: '12px',
          }}>
            <p style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', margin: '0 0 8px 0' }}>
              {t('dash.temp')}
            </p>
            <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              {formatTemp(temperature)}
            </p>
            <div className="progress-bar" style={{ height: '8px', backgroundColor: '#0a0a0a' }}>
              <div className="progress-bar-fill blink" style={{
                width: `${Math.min(100, (temperature + 10) * 2)}%`,
                backgroundColor: '#00ff00',
                height: '100%',
              }} />
            </div>
          </div>

          <div className="pixel-card" style={{
            backgroundColor: '#1a1a1a',
            borderLeft: '3px solid #00ff00',
            borderTop: '3px solid #00ff00',
            borderRight: '2px solid #00e5ff',
            borderBottom: '2px solid #00e5ff',
            padding: '12px',
          }}>
            <p style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', margin: '0 0 8px 0' }}>
              {t('dash.humidity')}
            </p>
            <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              {humidity.toFixed(0)}%
            </p>
            <div className="progress-bar" style={{ height: '8px', backgroundColor: '#0a0a0a' }}>
              <div className="progress-bar-fill blink" style={{
                width: `${humidity}%`,
                backgroundColor: '#00ff00',
                height: '100%',
              }} />
            </div>
          </div>

          <div className="pixel-card" style={{
            backgroundColor: '#1a1a1a',
            borderLeft: '3px solid #00ff00',
            borderTop: '3px solid #00ff00',
            borderRight: '2px solid #00e5ff',
            borderBottom: '2px solid #00e5ff',
            padding: '12px',
          }}>
            <p style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', margin: '0 0 8px 0' }}>
              {t('dash.water')}
            </p>
            <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              {waterLevel.toFixed(0)}%
            </p>
            <div className="progress-bar" style={{ height: '8px', backgroundColor: '#0a0a0a' }}>
              <div className="progress-bar-fill blink" style={{
                width: `${waterLevel}%`,
                backgroundColor: '#00ff00',
                height: '100%',
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '15px' }}>
          {t('dash.level')}
        </h2>

        <div className="pixel-card" style={{
          backgroundColor: '#1a1a1a',
          borderLeft: '3px solid #00ff00',
          borderTop: '3px solid #00ff00',
          borderRight: '2px solid #00e5ff',
          borderBottom: '2px solid #00e5ff',
          padding: '15px',
        }}>
          <p style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '10px', margin: '0 0 12px 0' }}>
            {t('dash.level')}
          </p>
          <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', margin: '0 0 6px 0' }}>
            XP: {xp} / 10000
          </p>
          <div className="progress-bar" style={{ height: '12px', backgroundColor: '#0a0a0a' }}>
            <div className="progress-bar-fill glow-pulse" style={{
              width: `${(xp / 10000) * 100}%`,
              backgroundColor: '#00e5ff',
              height: '100%',
            }} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '15px' }}>
          {t('dash.status')}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          {navigationCards.map((card, idx) => (
            <button
              key={idx}
              className="pixel-card"
              onClick={() => window.location.hash = card.hash}
              style={{
                backgroundColor: '#1a1a1a',
                borderLeft: '3px solid #00ff00',
                borderTop: '3px solid #00ff00',
                borderRight: '2px solid #00e5ff',
                borderBottom: '2px solid #00e5ff',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.1s',
                gap: '6px',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#2a2a2a'}
              onMouseLeave={e => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <span style={{ fontSize: '20px' }}>{card.icon}</span>
              <p style={{
                color: '#00ff00',
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '7px',
                margin: '0',
                textAlign: 'center',
                lineHeight: '1',
              }}>
                {card.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="scanline" style={{ pointerEvents: 'none' }} />
    </div>
  );
}
