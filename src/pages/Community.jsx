import React, { useState } from 'react';
import { useI18n } from '../core/i18n';

const Community = () => {
  const { t } = useI18n();
  const [likes, setLikes] = useState({
    post1: false,
    post2: false,
    post3: false,
  });

  const toggleLike = (postId) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div style={{ backgroundColor: '#0c1a0c', color: '#6ab86a', minHeight: '100vh', padding: '20px' }}>
      <h1 className="pixel-h1 font-pixel" style={{ color: '#6ab86a' }}>
        {t('com.title')}
      </h1>

      {/* Social Feed */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#20c8d8', marginBottom: '20px' }}>
          SOCIAL FEED
        </h2>

        {[1, 2, 3].map((num) => (
          <div key={num} className="pixel-card" style={{ marginBottom: '20px', border: '2px solid #6ab86a', padding: '15px', backgroundColor: '#0c1a0c' }}>
            <div style={{ position: 'relative', marginBottom: '10px', borderBottom: '2px solid #6ab86a', paddingBottom: '10px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
              <span className="pixel-tag" style={{ backgroundColor: '#20c8d8', color: '#0c1a0c', padding: '4px 8px', borderRadius: '0' }}>
                DAY {42 + num * 5}
              </span>
            </div>
            <div className="font-pixel" style={{ color: '#6ab86a', marginBottom: '8px' }}>
              @Grower_{num}
            </div>
            <p className="font-pixel" style={{ color: '#6ab86a', fontSize: '12px', lineHeight: '1.4' }}>
              Check out my grow! Looking healthy and vibrant. The lights are working perfectly!
            </p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '15px' }}>
              <button
                onClick={() => toggleLike(`post${num}`)}
                className="pixel-tag"
                style={{
                  backgroundColor: likes[`post${num}`] ? '#20c8d8' : 'transparent',
                  color: '#6ab86a',
                  border: '1px solid #6ab86a',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                {likes[`post${num}`] ? '❤' : '♡'} LIKE
              </button>
              <span className="pixel-tag" style={{ backgroundColor: '#6ab86a', color: '#0c1a0c', padding: '4px 8px' }}>
                {8 + num * 3} COMMENTS
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Strain Reviews */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#20c8d8', marginBottom: '20px' }}>
          STRAIN REVIEWS
        </h2>

        {[
          { name: 'RS11', stars: 4 },
          { name: 'LEMON PASTRIES', stars: 5 },
        ].map((strain, idx) => (
          <div key={idx} className="pixel-card" style={{ marginBottom: '15px', border: '2px solid #6ab86a', padding: '15px', backgroundColor: '#0c1a0c' }}>
            <h3 className="pixel-h3" style={{ color: '#6ab86a', marginBottom: '10px' }}>
              {strain.name}
            </h3>
            <div style={{ marginBottom: '10px' }}>
              <span className="pixel-tag-amber" style={{ backgroundColor: '#ffaa00', color: '#0c1a0c', padding: '4px 8px', marginRight: '10px' }}>
                {strain.stars} / 5 ⭐
              </span>
            </div>
            <p className="font-pixel" style={{ color: '#6ab86a', fontSize: '12px' }}>
              Exceptional quality and potency. Highly recommended!
            </p>
          </div>
        ))}
      </section>

      {/* Forum Hot Topics */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#20c8d8', marginBottom: '20px' }}>
          FORUM HOT TOPICS
        </h2>

        {[
          'How to optimize pH levels for seedlings',
          'Best nutrients for flowering stage',
        ].map((topic, idx) => (
          <div key={idx} className="pixel-card" style={{ marginBottom: '15px', border: '2px solid #20c8d8', padding: '15px', backgroundColor: '#0c1a0c' }}>
            <h3 className="pixel-h3" style={{ color: '#20c8d8', marginBottom: '10px' }}>
              {topic}
            </h3>
            <span className="pixel-tag" style={{ backgroundColor: '#6ab86a', color: '#0c1a0c', padding: '4px 8px' }}>
              {24 + idx * 15} REPLIES
            </span>
          </div>
        ))}
      </section>

      {/* Event Radar */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#20c8d8', marginBottom: '20px' }}>
          EVENT RADAR
        </h2>

        <div className="pixel-card" style={{ border: '2px solid #20c8d8', padding: '15px', backgroundColor: '#0c1a0c' }}>
          <h3 className="pixel-h3" style={{ color: '#20c8d8', marginBottom: '10px' }}>
            MARY JANE BERLIN
          </h3>
          <span className="pixel-tag" style={{ backgroundColor: '#20c8d8', color: '#0c1a0c', padding: '4px 8px' }}>
            14 JUN
          </span>
        </div>
      </section>

      {/* Instagram Link */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a
          href="https://www.instagram.com/BongHusky420"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn-amber font-pixel"
          style={{
            display: 'inline-block',
            backgroundColor: '#ffaa00',
            color: '#0c1a0c',
            padding: '10px 20px',
            border: '2px solid #ffaa00',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          INSTAGRAM ➔
        </a>
      </div>
    </div>
  );
};

export default Community;
