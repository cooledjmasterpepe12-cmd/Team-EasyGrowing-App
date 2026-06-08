import React, { useState } from 'react';
import { useI18n } from '../core/i18n';

export default function Achievements() {
  const { t } = useI18n();
  const [selectedBadge, setSelectedBadge] = useState('Master of Light');
  const currentLevel = 42;
  const currentXP = 12450;
  const nextLevelXP = 1200;
  const xpToNextLevel = 350;
  const xpPercent = ((nextLevelXP - xpToNextLevel) / nextLevelXP) * 100;

  const earned = [
    { id: 1, name: 'First Bloom', emoji: '🌸', desc: 'Harvested your first plant' },
    { id: 2, name: 'Collector', emoji: '📦', desc: 'Collected 10 different strains' },
    { id: 3, name: 'Expert', emoji: '🌿', desc: 'Achieved 50+ successful grows' },
    { id: 4, name: 'Master of Light', emoji: '☀️', desc: 'Optimized PPFD in 100 chambers' }
  ];

  const locked = [
    { id: 5, name: 'Phoenix Elder', emoji: '🔒', desc: 'Reach level 50' },
    { id: 6, name: 'Breeder', emoji: '🧪', desc: 'Create 5 custom strains' }
  ];

  const milestones = [
    { level: 10, name: 'Seedling', status: 'completed' },
    { level: 25, name: 'Bloomer', status: 'completed' },
    { level: 42, name: 'Phoenix', status: 'current' }
  ];

  return (
    <div style={{ background: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1 className="pixel-h1">{t('ach.title')}</h1>

      {/* User Progress Header */}
      <div className="pixel-card" style={{ border: '3px solid #00e5ff', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>LVL {currentLevel} PHOENIX</div>
          <div style={{ fontSize: '14px', color: '#00e5ff' }}>{currentXP} XP</div>
        </div>
        <div style={{ marginBottom: '10px', fontSize: '12px' }}>Next Level Progress</div>
        <div style={{ width: '100%', height: '24px', background: '#0a0a0a', border: '2px solid #00e5ff', overflow: 'hidden' }}>
          <div className="progress-bar-fill" style={{ width: `${xpPercent}%`, height: '100%', background: '#00e5ff', transition: 'width 0.3s' }} />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', textAlign: 'right', color: '#666' }}>{xpToNextLevel} / {nextLevelXP} XP</div>
      </div>

      {/* Achievement Grid */}
      <div style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ marginBottom: '20px' }}>Earned Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {earned.map((ach) => (
            <div key={ach.id} onClick={() => setSelectedBadge(ach.name)} className="pixel-card" style={{
              border: selectedBadge === ach.name ? '3px solid #00ff00' : '3px solid #00e5ff',
              padding: '20px',
              background: '#1a1a1a',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{ach.emoji}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{ach.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ marginBottom: '20px' }}>Locked</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {locked.map((ach) => (
            <div key={ach.id} className="pixel-card" style={{
              border: '3px solid #666',
              padding: '20px',
              background: '#1a1a1a',
              textAlign: 'center',
              opacity: 0.5
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{ach.emoji}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{ach.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Detail */}
      <div className="pixel-card" style={{ border: '3px solid #00e5ff', padding: '20px', background: '#1a1a1a', marginBottom: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>☀️</div>
        <h2 className="pixel-h2">{selectedBadge}</h2>
        <p style={{ marginTop: '15px', fontSize: '14px', lineHeight: '1.6' }}>Master optimization techniques across 100 different grow chambers. Fine-tune PPFD levels to achieve maximum yields and plant health metrics in record time.</p>
        <div style={{ marginTop: '20px' }}>
          <span className="pixel-tag-amber" style={{ display: 'inline-block', padding: '8px 16px', border: '2px solid #ffaa00', background: '#1a1a1a', color: '#ffaa00', fontSize: '12px' }}>
            Rare - 5%
          </span>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="pixel-card" style={{ border: '3px solid #00ff00', padding: '20px', background: '#1a1a1a' }}>
        <h2 className="pixel-h2" style={{ marginBottom: '20px' }}>Milestones</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid ' + (m.status === 'completed' ? '#00ff00' : '#00e5ff'),
                background: m.status === 'completed' ? '#00ff00' : (m.status === 'current' ? '#00e5ff' : '#0a0a0a')
              }} />
              <div>
                <div style={{ fontWeight: 'bold' }}>Level {m.level}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{m.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
