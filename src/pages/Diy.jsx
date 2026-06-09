import React, { useState } from 'react';
import { useI18n } from '../core/i18n';

export default function Diy() {
  const { t } = useI18n();
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [height, setHeight] = useState('');
  const [exhaustDiameter, setExhaustDiameter] = useState('');

  const calculateCutList = () => {
    if (!width || !depth || !height) return null;

    const w = parseFloat(width);
    const d = parseFloat(depth);
    const h = parseFloat(height);

    return {
      top: `${w} × ${d} cm`,
      bottom: `${w} × ${d} cm`,
      sides: `2× ${d} × ${h} cm`,
      front: `${w} × ${h} cm`,
      back: `${w} × ${h} cm`,
    };
  };

  const calculateVolume = () => {
    if (!width || !depth || !height) return null;
    const liters = (parseFloat(width) * parseFloat(depth) * parseFloat(height)) / 1000;
    return liters.toFixed(1);
  };

  const calculateVentilation = () => {
    if (!exhaustDiameter) return null;

    const diameter = parseFloat(exhaustDiameter);
    const radius = diameter / 2;
    const area = Math.PI * radius * radius;
    const cfm = (area * 100).toFixed(0);

    return { area: area.toFixed(2), cfm };
  };

  const getLightTrapRecommendation = () => {
    if (!exhaustDiameter) return null;
    const d = parseFloat(exhaustDiameter);
    if (d <= 5) return 'Mini Light Trap (bucket style)';
    if (d <= 8) return 'Standard Light Trap (5" baffle)';
    return 'Heavy-Duty Light Trap (double baffle)';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const cutList = calculateCutList();
  const volume = calculateVolume();
  const ventilation = calculateVentilation();
  const lightTrap = getLightTrapRecommendation();

  return (
    <div style={styles.container}>
      <h1 style={styles.h1} className="pixel-h1 glow-pulse">{t('diy.title')}</h1>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Box Dimensions</h2>
        <div style={styles.card} className="pixel-card">
          <input
            type="number"
            placeholder="Width (cm)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Depth (cm)"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
        </div>
      </div>

      {cutList && (
        <div style={styles.section}>
          <h2 style={styles.h2} className="pixel-h2">Cut List</h2>
          <div style={styles.cutListGrid}>
            {Object.entries(cutList).map(([part, dims]) => (
              <div key={part} style={styles.cutCard} className="pixel-card">
                <p style={styles.partName}>{part.toUpperCase()}</p>
                <p style={styles.partDims}>{dims}</p>
                <button
                  onClick={() => copyToClipboard(`${part}: ${dims}`)}
                  className="pixel-btn"
                  style={styles.smallBtn}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {volume && (
        <div style={styles.section}>
          <h2 style={styles.h2} className="pixel-h2">Volume</h2>
          <div style={styles.card} className="pixel-card">
            <p style={styles.volumeText}>
              <strong>{volume} Liters</strong>
            </p>
          </div>
        </div>
      )}

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Ventilation Calculator</h2>
        <div style={styles.card} className="pixel-card">
          <input
            type="number"
            placeholder="Exhaust Diameter (cm)"
            value={exhaustDiameter}
            onChange={(e) => setExhaustDiameter(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />

          {ventilation && (
            <div>
              <p style={styles.resultText}>Duct Area: {ventilation.area} cm²</p>
              <p style={styles.resultText}>Recommended CFM: {ventilation.cfm}</p>
            </div>
          )}
        </div>
      </div>

      {lightTrap && (
        <div style={styles.section}>
          <h2 style={styles.h2} className="pixel-h2">Light Trap Recommendation</h2>
          <div style={styles.card} className="pixel-card">
            <p style={styles.recommendation}>{lightTrap}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c1a0c',
    color: '#6ab86a',
    padding: '20px',
    fontFamily: 'font-pixel',
    minHeight: '100vh',
  },
  h1: {
    fontSize: '32px',
    marginBottom: '20px',
    textShadow: '0 0 10px #6ab86a',
  },
  h2: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#20c8d8',
  },
  section: {
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#122212',
    border: '4px solid #6ab86a',
    padding: '15px',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    backgroundColor: '#0c1a0c',
    border: '2px solid #6ab86a',
    color: '#6ab86a',
    fontFamily: 'font-pixel',
    boxSizing: 'border-box',
  },
  cutListGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
  },
  cutCard: {
    backgroundColor: '#122212',
    border: '3px solid #20c8d8',
    padding: '10px',
  },
  partName: {
    fontSize: '12px',
    marginBottom: '5px',
    color: '#20c8d8',
  },
  partDims: {
    fontSize: '14px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  smallBtn: {
    backgroundColor: '#20c8d8',
    color: '#0c1a0c',
    border: '2px solid #20c8d8',
    padding: '6px 10px',
    cursor: 'pointer',
    fontFamily: 'font-pixel',
    fontSize: '12px',
    width: '100%',
  },
  volumeText: {
    fontSize: '18px',
    color: '#6ab86a',
  },
  resultText: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  recommendation: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff9500',
  },
};
