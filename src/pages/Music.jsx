import React, { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useAuth } from '../core/auth';
import { useDB } from '../core/db';

const Music = () => {
  const { t } = useI18n();
  const { isAdmin } = useAuth();
  const { getTracks, addTrack, deleteTrack } = useDB();

  const [playing, setPlaying] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', artist: '', duration: '', url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const data = await getTracks();
      setTracks(data.map(t => ({
        id: t.id,
        name: t.title,
        artist: t.artist,
        duration: `${Math.floor(t.duration_seconds / 60)}:${(t.duration_seconds % 60).toString().padStart(2, '0')}`,
        url: t.file_url,
      })));
    } catch (err) {
      console.error('Failed to load tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrack = async () => {
    if (!formData.name || !formData.url) return;
    try {
      const durationSecs = parseInt(formData.duration.split(':')[0]) * 60 + parseInt(formData.duration.split(':')[1]);
      await addTrack(formData.name, formData.artist, durationSecs, formData.url);
      setFormData({ name: '', artist: '', duration: '', url: '' });
      setShowAddForm(false);
      loadTracks();
    } catch (err) {
      console.error('Failed to add track:', err);
    }
  };

  const handleDeleteTrack = async (id) => {
    try {
      await deleteTrack(id);
      loadTracks();
    } catch (err) {
      console.error('Failed to delete track:', err);
    }
  };

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

      {/* Admin Controls */}
      {isAdmin && (
        <section style={{ marginBottom: '40px', padding: '15px', border: '2px solid #ff9500', backgroundColor: '#1a1200' }}>
          <h2 className="pixel-h2" style={{ color: '#ff9500', marginBottom: '10px' }}>
            ADMIN: MANAGE TRACKS
          </h2>
          <button
            className="pixel-btn-amber"
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ marginBottom: showAddForm ? '15px' : 0 }}
          >
            {showAddForm ? 'CANCEL' : '+ ADD TRACK'}
          </button>

          {showAddForm && (
            <div style={{ marginTop: '15px' }}>
              <input
                type="text"
                className="pixel-input"
                placeholder="Track name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                className="pixel-input"
                placeholder="Artist"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                className="pixel-input"
                placeholder="Duration (mm:ss)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                className="pixel-input"
                placeholder="File URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <button className="pixel-btn-amber" onClick={handleAddTrack}>
                SAVE TRACK
              </button>
            </div>
          )}
        </section>
      )}

      {/* Track List */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>
          TRACKS
        </h2>

        {loading ? (
          <p style={{ color: '#00ff00' }}>Loading tracks...</p>
        ) : tracks.length === 0 ? (
          <p style={{ color: '#00ff00' }}>No tracks available</p>
        ) : (
          tracks.map((track) => (
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
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {track.artist && (
                    <span className="pixel-tag" style={{ backgroundColor: '#00ff00', color: '#000', padding: '4px 8px', fontSize: '10px' }}>
                      {track.artist}
                    </span>
                  )}
                  <span className="pixel-tag" style={{ backgroundColor: '#00e5ff', color: '#000', padding: '4px 8px', fontSize: '10px' }}>
                    {track.duration}
                  </span>
                </div>
              </div>
              {isAdmin && (
                <button
                  className="pixel-btn-red"
                  onClick={() => handleDeleteTrack(track.id)}
                  style={{ width: '40px', height: '40px', padding: 0, fontSize: '14px' }}
                >
                  ✕
                </button>
              )}
            </div>
          ))
        )}
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
    </div>
  );
};

export default Music;
