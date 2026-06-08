import React, { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';

const Music = () => {
  const { t } = useI18n();
  const { formatTemp } = useUnits();
  const [playing, setPlaying] = useState(null);

  const tracks = [
    { id: 1, name: 'Akapella', duration: '3:45' },
    { id: 2, name: 'Hit From The Bong Remix', duration: '4:12' },
    { id: 3, name: 'Keimei Rap', duration: '3:28' },
  ];

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px' }}>
      <h1 className="pixel-h1 font-pixel" style={{ color: '#00ff00' }}>
        {t('music.title')}
      </h1>

      {/* Featured Release Hero */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div className="pixel-card" style={{ border: '2px solid #00ff00', padding: '30px', backgroundColor: '#000', textAlign: 'center' }}>
          <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
            4 SONGS. 1 VISION.
          </h2>
          <p className="font-pixel" style={{ color: '#00ff00', fontSize: '14px', marginBottom: '20px' }}>
            THE OFFICIAL TEAM EASYGROWING ALBUM
          </p>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎵</div>
        </div>
      </section>

      {/* Track List */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
          TRACKS
        </h2>

        {tracks.map((track) => (
          <div key={track.id} className="pixel-card" style={{ marginBottom: '15px', border: '2px solid #00ff00', padding: '15px', backgroundColor: '#000', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setPlaying(playing === track.id ? null : track.id)}
              className="pixel-btn"
              style={{
                width: '40px',
                height: '40px',
                border: '2px solid #00ff00',
                backgroundColor: playing === track.id ? '#00e5ff' : '#000',
                color: '#00ff00',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {playing === track.id ? '⏸' : '▶'}
            </button>
            <div style={{ flex: 1 }}>
              <h3 className="pixel-h3 font-pixel" style={{ color: '#00ff00', marginBottom: '5px', fontSize: '14px' }}>
                {track.name}
              </h3>
              <span className="pixel-tag" style={{ backgroundColor: '#00ff00', color: '#000', padding: '4px 8px', fontSize: '12px' }}>
                {track.duration}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Music Platform Links */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
          LISTEN ON
        </h2>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a
            href="https://open.spotify.com/artist/06HLovvJm7QjU-pD3lO0jM"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn-cyan font-pixel"
            style={{
              display: 'inline-block',
              backgroundColor: '#00e5ff',
              color: '#000',
              padding: '10px 20px',
              border: '2px solid #00e5ff',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            SPOTIFY ➔
          </a>
          <a
            href="https://music.amazon.de/artists/B0H1RMG3CD/team-easygrowing"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn-amber font-pixel"
            style={{
              display: 'inline-block',
              backgroundColor: '#ffaa00',
              color: '#000',
              padding: '10px 20px',
              border: '2px solid #ffaa00',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            AMAZON MUSIC ➔
          </a>
        </div>
      </section>

      {/* Grow Sessions */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
          GROW SESSIONS
        </h2>

        <div className="pixel-card" style={{ border: '2px solid #00ff00', padding: '15px', backgroundColor: '#000' }}>
          <h3 className="pixel-h3" style={{ color: '#00ff00', marginBottom: '10px' }}>
            ORGANIC VIBE MIX
          </h3>
          <p className="font-pixel" style={{ color: '#00ff00', fontSize: '12px' }}>
            Curated playlist for optimal growing atmosphere
          </p>
        </div>
      </section>

      {/* Mary Jane Countdown Gallery */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
          MARY JANE COUNTDOWN
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {[1, 2, 3].map((num) => (
            <div key={num} className="pixel-card" style={{ border: '2px solid #00e5ff', padding: '20px', backgroundColor: '#000', textAlign: 'center', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '48px' }}>📸</div>
            </div>
          ))}
        </div>
      </section>

      {/* Language/Unit Toggles Info */}
      <section style={{ marginTop: '40px', marginBottom: '20px', padding: '15px', border: '2px dashed #00e5ff' }}>
        <p className="font-pixel" style={{ color: '#00e5ff', fontSize: '12px' }}>
          Language and unit settings available in main settings
        </p>
      </section>
    </div>
  );
};

export default Music;
