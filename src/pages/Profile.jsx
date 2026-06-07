import React from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';

export default function Profile() {
  const { t, lang, setLang } = useI18n();
  const { mode, setMode } = useUnits();
  const { user } = useAuth();
  const currentLevel = 42;
  const currentXP = 8450;
  const maxXP = 10000;
  const xpPercent = (currentXP / maxXP) * 100;

  return (
    <div style={{ background: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1 className="pixel-h1">{t('prof.title')}</h1>

      {/* Avatar & Level */}
      <div className="pixel-card" style={{ border: '3px solid #00ff00', padding: '40px', background: '#1a1a1a', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎮</div>
        <h2 className="pixel-h2">{user?.username || 'PLAYER'}</h2>
        <div className="pixel-tag-amber" style={{ display: 'inline-block', padding: '8px 16px', border: '2px solid #ffaa00', background: '#1a1a1a', color: '#ffaa00', marginTop: '15px', fontSize: '14px' }}>
          LVL {currentLevel}
        </div>
      </div>

      {/* XP Progress */}
      <div className="pixel-card" style={{ border: '3px solid #00e5ff', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <h3 className="pixel-h3">{t('prof.xp')}</h3>
        <div style={{ marginTop: '15px', marginBottom: '10px', fontSize: '14px' }}>
          {currentXP} / {maxXP} XP
        </div>
        <div style={{ width: '100%', height: '20px', background: '#0a0a0a', border: '2px solid #00e5ff', overflow: 'hidden' }}>
          <div className="progress-bar-fill" style={{ width: `${xpPercent}%`, height: '100%', background: '#00ff00', transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Settings */}
      <div className="pixel-card" style={{ border: '3px solid #00ff00', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <h2 className="pixel-h2">{t('prof.settings')}</h2>

        {/* Language */}
        <div style={{ marginTop: '20px', paddingBottom: '20px', borderBottom: '2px solid #666' }}>
          <div style={{ marginBottom: '15px', fontSize: '14px' }}>{t('prof.lang')}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['de', 'en', 'es'].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '10px 20px',
                border: '3px solid ' + (lang === l ? '#00ff00' : '#666'),
                background: '#1a1a1a',
                color: lang === l ? '#00ff00' : '#666',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: lang === l ? 'bold' : 'normal'
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div style={{ marginTop: '20px', paddingBottom: '20px', borderBottom: '2px solid #666' }}>
          <div style={{ marginBottom: '15px', fontSize: '14px' }}>{t('prof.temp')}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['C', 'F'].map((m) => (
              <button key={m} onClick={() => setMode(m === 'C' ? 'metric' : 'imperial')} style={{
                padding: '10px 20px',
                border: '3px solid ' + (mode === (m === 'C' ? 'metric' : 'imperial') ? '#00e5ff' : '#666'),
                background: '#1a1a1a',
                color: mode === (m === 'C' ? 'metric' : 'imperial') ? '#00e5ff' : '#666',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: mode === (m === 'C' ? 'metric' : 'imperial') ? 'bold' : 'normal'
              }}>
                °{m}
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px', fontSize: '14px' }}>{t('prof.vol')}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['L', 'Gal'].map((m) => (
              <button key={m} onClick={() => setMode(m === 'L' ? 'metric' : 'imperial')} style={{
                padding: '10px 20px',
                border: '3px solid ' + (mode === (m === 'L' ? 'metric' : 'imperial') ? '#00e5ff' : '#666'),
                background: '#1a1a1a',
                color: mode === (m === 'L' ? 'metric' : 'imperial') ? '#00e5ff' : '#666',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: mode === (m === 'L' ? 'metric' : 'imperial') ? 'bold' : 'normal'
              }}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
