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

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-2 border-[#00ff00] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logoteam.png" alt="Team EasyGrowing" style={{ height: '40px', width: 'auto' }} />
          <span className="font-pixel text-[14px] text-[#00ff00] glow-pulse">EASYGROWING</span>
        </div>
        <div className="flex items-center gap-2">
          {['de', 'en', 'es'].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`font-pixel text-[8px] px-2 py-1 border transition-all
                ${lang === l ? 'border-[#00ff00] bg-[#00ff00] text-black' : 'border-[#444] text-[#888] hover:border-[#00ff00]'}`}>
              {l.toUpperCase()}
            </button>
          ))}
          <button onClick={() => setMode(mode === 'metric' ? 'imperial' : 'metric')}
            className="font-pixel text-[8px] px-2 py-1 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-all ml-2">
            {mode === 'metric' ? '°C/L' : '°F/GAL'}
          </button>

          {/* User Menu */}
          {isLoggedIn ? (
            <div ref={userMenuRef} className="relative ml-2">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="font-pixel text-[8px] px-2 py-1 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all flex items-center gap-1">
                <span>{user?.username?.toUpperCase() || 'USER'}</span>
                <span style={{ fontSize: '6px' }}>▼</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border-2 border-[#00ff00] min-w-[140px] z-50">
                  <button onClick={() => { setUserMenuOpen(false); window.location.hash = '/profile'; }}
                    className="w-full text-left font-pixel text-[8px] text-[#00ff00] px-3 py-2 hover:bg-[#001a00] transition-all">
                    {t('nav.profile')}
                  </button>
                  <button onClick={handleLogout}
                    className="w-full text-left font-pixel text-[8px] text-[#ff3333] px-3 py-2 hover:bg-[#1a0000] transition-all border-t border-[#333]">
                    {t('auth.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => window.location.hash = '/register'}
              className="font-pixel text-[8px] px-2 py-1 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all ml-2">
              {t('auth.login')}
            </button>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="font-pixel text-[12px] text-[#00ff00] ml-2 hover:text-[#00e5ff]">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Nav Overlay */}
      {menuOpen && (
        <nav className="fixed inset-0 z-40 bg-[#0a0a0a]/95 pt-14 scanline" onClick={() => setMenuOpen(false)}>
          <div className="grid grid-cols-4 gap-2 p-4 max-w-lg mx-auto">
            {NAV_ITEMS.map(n => (
              <a key={n.path} href={`#${n.path}`}
                onClick={(e) => { e.preventDefault(); window.location.hash = n.path; setMenuOpen(false); }}
                className={`pixel-card text-center py-3 hover:bg-[#00ff00]/10 transition-all cursor-pointer
                  ${currentPath === n.path ? 'border-[#00ff00] bg-[#001a00]' : ''}`}>
                <div className="text-lg">{n.icon}</div>
                <div className="font-pixel text-[7px] text-[#00ff00] mt-1">{t(n.key)}</div>
              </a>
            ))}
          </div>
        </nav>
      )}

      <main className="flex-1 pt-14 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Mini Player Bar */}
      {currentTrack && (
        <div className="fixed bottom-12 left-0 right-0 z-40 bg-[#0a0a0a] border-t-2 border-b-2 border-[#00e5ff] px-4 py-2">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay}
              className="font-pixel text-[16px] text-[#00ff00] hover:text-[#00e5ff] transition-all"
              style={{ minWidth: '24px' }}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-pixel text-[10px] text-[#00ff00] truncate">{currentTrack.name}</div>
              {currentTrack.artist && (
                <div className="font-pixel text-[8px] text-[#00e5ff] truncate">{currentTrack.artist}</div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="font-pixel text-[8px] text-[#666]">{formatTime(currentTime)}</span>
              <div className="flex-1 h-2 bg-[#1a1a1a] border border-[#444] cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  seekTo(percent * duration);
                }}>
                <div className="absolute left-0 top-0 h-full bg-[#00e5ff] transition-all"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>
              <span className="font-pixel text-[8px] text-[#666]">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Quick Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t-2 border-[#00ff00] flex justify-around py-2">
        {NAV_ITEMS.slice(0, 5).map(n => (
          <a key={n.path} href={`#${n.path}`}
            onClick={(e) => { e.preventDefault(); window.location.hash = n.path; }}
            className={`flex flex-col items-center font-pixel text-[7px] py-1 px-1 transition-all
              ${currentPath === n.path ? 'text-[#00ff00]' : 'text-[#666] hover:text-[#00ff00]'}`}>
            <span className="text-sm">{n.icon}</span>
            {t(n.key)}
          </a>
        ))}
      </nav>
    </div>
  );
}
