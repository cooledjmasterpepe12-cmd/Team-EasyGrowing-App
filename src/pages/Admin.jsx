import React, { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useAuth } from '../core/auth';

export default function Admin() {
  const { t } = useI18n();
  const { isLoggedIn } = useAuth();
  const [temp, setTemp] = useState(22);
  const [humidity, setHumidity] = useState(65);
  const [exhaustOn, setExhaustOn] = useState(true);
  const [circulationOn, setCirculationOn] = useState(false);
  const [lyrics, setLyrics] = useState(() => localStorage.getItem('studio_lyrics') || '');
  const [log, setLog] = useState(['[00:00] System initialized', '[00:05] Sensors calibrated']);

  useEffect(() => {
    localStorage.setItem('studio_lyrics', lyrics);
  }, [lyrics]);

  const vpd = ((temp - humidity / 100 * (temp - 20)) * 0.61).toFixed(2);

  if (!isLoggedIn) {
    return (
      <div style={{ background: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="pixel-card-cyan" style={{ border: '3px solid #00e5ff', padding: '40px', background: '#1a1a1a', textAlign: 'center', maxWidth: '400px' }}>
          <h2 className="pixel-h2">ACCESS DENIED</h2>
          <p style={{ marginTop: '20px', marginBottom: '20px' }}>Admin area requires authentication</p>
          <a href="#/register" style={{ color: '#00ff00', textDecoration: 'underline', fontSize: '14px' }}>Register or Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1 className="pixel-h1">{t('admin.title')}</h1>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'MEMBERS', value: '15,420' },
          { label: 'IoT BOXES', value: '4,892' },
          { label: 'REPORTS', value: '0' },
          { label: 'UPTIME', value: '99.98%' }
        ].map((m, i) => (
          <div key={i} className="pixel-card-cyan" style={{ border: '3px solid #00e5ff', padding: '20px', background: '#1a1a1a' }}>
            <div style={{ fontSize: '12px', marginBottom: '10px', color: '#00e5ff' }}>{m.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ff00' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Live Grow-Chamber Simulator */}
      <div className="pixel-card" style={{ border: '3px solid #00ff00', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <h2 className="pixel-h2">Live Grow-Chamber Simulator</h2>

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px' }}>Temperature: <span style={{ color: '#00e5ff' }}>{temp}°C</span></label>
            <input type="range" min="15" max="40" value={temp} onChange={(e) => setTemp(+e.target.value)} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '10px' }}>Humidity: <span style={{ color: '#00e5ff' }}>{humidity}%</span></label>
            <input type="range" min="20" max="95" value={humidity} onChange={(e) => setHumidity(+e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#0a0a0a', border: '2px solid #00e5ff', borderRadius: '4px' }}>
          <div>VPD: <span style={{ color: '#00ff00' }}>{vpd} kPa</span></div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
          <button onClick={() => setExhaustOn(!exhaustOn)} style={{ padding: '10px 20px', border: '3px solid ' + (exhaustOn ? '#00ff00' : '#666'), background: '#1a1a1a', color: exhaustOn ? '#00ff00' : '#666', cursor: 'pointer', fontFamily: 'monospace' }}>
            EXHAUST {exhaustOn ? 'ON' : 'OFF'}
          </button>
          <button onClick={() => setCirculationOn(!circulationOn)} style={{ padding: '10px 20px', border: '3px solid ' + (circulationOn ? '#00ff00' : '#666'), background: '#1a1a1a', color: circulationOn ? '#00ff00' : '#666', cursor: 'pointer', fontFamily: 'monospace' }}>
            CIRCULATION {circulationOn ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#0a0a0a', border: '2px solid #00ff00', maxHeight: '150px', overflowY: 'auto', fontSize: '12px' }}>
          {log.map((entry, i) => (
            <div key={i} style={{ color: '#00ff00', lineHeight: '1.6' }}>{entry}</div>
          ))}
        </div>
      </div>

      {/* Studio Collab */}
      <div className="pixel-card-cyan" style={{ border: '3px solid #00e5ff', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <h2 className="pixel-h2">Studio Collab - Lyrics</h2>
        <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} style={{ width: '100%', height: '200px', marginTop: '15px', padding: '10px', background: '#0a0a0a', color: '#00ff00', border: '2px solid #00e5ff', fontFamily: 'monospace', resize: 'none' }} placeholder="Write your lyrics here..." />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>Auto-saved to localStorage</div>
      </div>

      {/* Community Moderation */}
      <div className="pixel-card" style={{ border: '3px solid #00ff00', padding: '20px', background: '#1a1a1a' }}>
        <h2 className="pixel-h2">Community Moderation</h2>
        <div style={{ marginTop: '20px' }}>
          {[
            { id: 1, user: 'PixelMaster', content: 'Just harvested 2kg! Team EasyGrowing rocks!' },
            { id: 2, user: 'GrowthHunter', content: 'New strain tutorial incoming...' }
          ].map((item) => (
            <div key={item.id} style={{ padding: '15px', background: '#0a0a0a', border: '2px solid #666', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#00e5ff', fontWeight: 'bold' }}>{item.user}</div>
                <div style={{ color: '#00ff00', fontSize: '14px', marginTop: '5px' }}>{item.content}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ padding: '8px 12px', border: '2px solid #00ff00', background: '#1a1a1a', color: '#00ff00', cursor: 'pointer', fontFamily: 'monospace', fontSize: '12px' }}>APPROVE</button>
                <button style={{ padding: '8px 12px', border: '2px solid #ff4444', background: '#1a1a1a', color: '#ff4444', cursor: 'pointer', fontFamily: 'monospace', fontSize: '12px' }}>REJECT</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
