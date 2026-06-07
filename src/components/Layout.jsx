import { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';

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
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-2 border-[#00ff00] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[14px] text-[#00ff00] glow-pulse">EASYGROWING</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          {['de', 'en', 'es'].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`font-pixel text-[8px] px-2 py-1 border transition-all
                ${lang === l ? 'border-[#00ff00] bg-[#00ff00] text-black' : 'border-[#444] text-[#888] hover:border-[#00ff00]'}`}>
              {l.toUpperCase()}
            </button>
          ))}
          {/* Unit toggle */}
          <button onClick={() => setMode(mode === 'metric' ? 'imperial' : 'metric')}
            className="font-pixel text-[8px] px-2 py-1 border border-[#cc00ff] text-[#cc00ff] hover:bg-[#cc00ff] hover:text-black transition-all ml-2">
            {mode === 'metric' ? '°C/L' : '°F/GAL'}
          </button>
          {/* Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="font-pixel text-[12px] text-[#00ff00] ml-2 hover:text-[#cc00ff]">
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

      {/* Main Content */}
      <main className="flex-1 pt-14 pb-16 overflow-y-auto">
        {children}
      </main>

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
