import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';
import { useMusicPlayer } from '../core/music-player';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const NAV_ITEMS = [
  { path: '/', key: 'nav.home', icon: '⌂' },
  { path: '/diary', key: 'nav.diary', icon: '📓' },
  { path: '/bible', key: 'nav.bible', icon: '📖' },
  { path: '/tools', key: 'nav.tools', icon: '🔧' },
  { path: '/genetics', key: 'nav.genetics', icon: '🧬' },
  { path: '/community', key: 'nav.community', icon: '🐺' },
  { path: '/music', key: 'nav.music', icon: '🎵' },
  { path: '/shop', key: 'nav.shop', icon: '🛒' },
  { path: '/extraction', key: 'nav.extract', icon: '🔥' },
  { path: '/diy', key: 'nav.diy', icon: '🪚' },
  { path: '/iot', key: 'nav.iot', icon: '📡' },
  { path: '/doctor', key: 'nav.doctor', icon: '🩺' },
  { path: '/b2b', key: 'nav.b2b', icon: '📊' },
  { path: '/admin', key: 'nav.admin', icon: '🛡' },
  { path: '/profile', key: 'nav.profile', icon: '👤' },
  { path: '/achievements', key: 'nav.achievements', icon: '🏆' },
];

export default function Layout({ children, currentPath }) {
  const { lang, setLang, t } = useI18n();
  const { mode, setMode } = useUnits();
  const { user, isLoggedIn, logout } = useAuth();
  const { currentTrack, isPlaying, togglePlay, currentTime, duration, seekTo } = useMusicPlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    window.location.hash = '/';
  };

  const hasMiniPlayer = !!currentTrack;

  return (
    <div style={{ minHeight: '100vh', background: '#0c1a0c', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#080f08',
        borderBottom: '1px solid #2a4a2a',
        padding: '0 16px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logoteam.png" alt="Team EasyGrowing" style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }} />
          <div>
            <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '10px', color: '#6ab86a', lineHeight: 1, letterSpacing: '1px' }}>
              EASYGROWING
            </div>
            <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '6px', color: '#4a7a4a', marginTop: '3px', letterSpacing: '1px' }}>
              BOTANICAL INTEL
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Language switcher */}
          {['de', 'en', 'es'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '7px',
              padding: '4px 6px',
              border: '1px solid',
              borderColor: lang === l ? '#6ab86a' : '#2a4a2a',
              background: lang === l ? '#2a5a2a' : 'transparent',
              color: lang === l ? '#c8ffc8' : '#5a8a5a',
              cursor: 'pointer',
              borderRadius: '3px',
              transition: 'all 0.15s',
            }}>
              {l.toUpperCase()}
            </button>
          ))}

          {/* Units toggle */}
          <button onClick={() => setMode(mode === 'metric' ? 'imperial' : 'metric')} style={{
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '7px',
            padding: '4px 6px',
            border: '1px solid #2a6070',
            background: 'transparent',
            color: '#20c8d8',
            cursor: 'pointer',
            borderRadius: '3px',
            marginLeft: '2px',
          }}>
            {mode === 'metric' ? '°C' : '°F'}
          </button>

          {/* User menu */}
          {isLoggedIn ? (
            <div ref={userMenuRef} style={{ position: 'relative', marginLeft: '4px' }}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '7px',
                padding: '4px 8px',
                border: '1px solid #2a6070',
                background: 'rgba(21, 128, 144, 0.15)',
                color: '#20c8d8',
                cursor: 'pointer',
                borderRadius: '3px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                {user?.username?.toUpperCase()?.slice(0, 8) || 'USER'}
                <span style={{ fontSize: '5px' }}>▼</span>
              </button>
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                  background: '#0e1e0e', border: '1px solid #2a4a2a',
                  borderRadius: '4px', minWidth: '130px', zIndex: 100,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                }}>
                  <button onClick={() => { setUserMenuOpen(false); window.location.hash = '/profile'; }} style={{
                    width: '100%', textAlign: 'left',
                    fontFamily: 'Press Start 2P, monospace', fontSize: '8px',
                    color: '#6ab86a', padding: '10px 14px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    borderBottom: '1px solid #1a3a1a',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.target.style.background = '#162816'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}>
                    {t('nav.profile')}
                  </button>
                  <button onClick={handleLogout} style={{
                    width: '100%', textAlign: 'left',
                    fontFamily: 'Press Start 2P, monospace', fontSize: '8px',
                    color: '#e06060', padding: '10px 14px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.target.style.background = '#1a0e0e'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}>
                    {t('auth.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => window.location.hash = '/register'} style={{
              fontFamily: 'Press Start 2P, monospace', fontSize: '7px',
              padding: '4px 8px',
              border: '1px solid #2a6070', background: 'rgba(21, 128, 144, 0.15)',
              color: '#20c8d8', cursor: 'pointer', borderRadius: '3px', marginLeft: '4px',
            }}>
              {t('auth.login')}
            </button>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            fontFamily: 'Press Start 2P, monospace', fontSize: '14px',
            color: '#6ab86a', background: 'transparent', border: 'none',
            cursor: 'pointer', marginLeft: '6px', padding: '2px',
            lineHeight: 1,
          }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Nav Overlay */}
      {menuOpen && (
        <nav
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(8, 15, 8, 0.97)',
            paddingTop: '60px',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px', padding: '16px', maxWidth: '500px', margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            {NAV_ITEMS.map(n => (
              <button key={n.path}
                onClick={() => { window.location.hash = n.path; setMenuOpen(false); }}
                style={{
                  background: currentPath === n.path
                    ? 'linear-gradient(145deg, #1e3a1e, #162616)'
                    : 'linear-gradient(145deg, #122212, #0e1a0e)',
                  border: currentPath === n.path ? '1px solid #4a8a4a' : '1px solid #1e3a1e',
                  borderRadius: '8px',
                  padding: '14px 6px',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '6px',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '20px' }}>{n.icon}</span>
                <span style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#b8d8b8', textAlign: 'center' }}>
                  {t(n.key)}
                </span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main content */}
      <main style={{
        flex: 1,
        paddingTop: '52px',
        paddingBottom: hasMiniPlayer ? '90px' : '56px',
        overflowY: 'auto',
      }}>
        {children}
      </main>

      {/* Mini Player Bar */}
      {currentTrack && (
        <div style={{
          position: 'fixed', bottom: '48px', left: 0, right: 0, zIndex: 40,
          background: '#0a150a',
          borderTop: '1px solid #2a5a2a',
          padding: '8px 16px',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={togglePlay} style={{
              fontSize: '16px', color: '#6ab86a', background: 'none', border: 'none',
              cursor: 'pointer', flexShrink: 0, padding: 0,
            }}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ minWidth: 0, flex: '0 0 auto', maxWidth: '120px' }}>
              <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '9px', color: '#6ab86a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentTrack.name}
              </div>
              {currentTrack.artist && (
                <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#4a7a4a', marginTop: '2px' }}>
                  {currentTrack.artist}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4a7a4a', flexShrink: 0 }}>{formatTime(currentTime)}</span>
              <div
                style={{ flex: 1, height: '4px', background: '#1a2a1a', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seekTo(((e.clientX - rect.left) / rect.width) * duration);
                }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  background: '#4a8a4a', borderRadius: '2px',
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  transition: 'width 0.3s',
                }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4a7a4a', flexShrink: 0 }}>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Quick Nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#080f08',
        borderTop: '1px solid #2a4a2a',
        display: 'flex', justifyContent: 'space-around',
        paddingTop: '6px', paddingBottom: '6px',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.5)',
      }}>
        {NAV_ITEMS.slice(0, 5).map(n => (
          <button key={n.path}
            onClick={() => window.location.hash = n.path}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Press Start 2P, monospace', fontSize: '7px',
              color: currentPath === n.path ? '#6ab86a' : '#4a6a4a',
              padding: '4px 8px',
              transition: 'color 0.15s',
              gap: '3px',
            }}
          >
            <span style={{ fontSize: '16px' }}>{n.icon}</span>
            <span>{t(n.key)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
