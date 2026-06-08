import React, { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';

export default function Extraction() {
  const { t } = useI18n();
  const { formatTemp } = useUnits();
  const [rosinMaterial, setRosinMaterial] = useState('');
  const [rosinTemp, setRosinTemp] = useState('');
  const [rosinPressure, setRosinPressure] = useState('');
  const [rosinYield, setRosinYield] = useState(null);
  const [rosinGrade, setRosinGrade] = useState('');

  const [siftScreen, setSiftScreen] = useState('');
  const [siftAmount, setSiftAmount] = useState('');
  const [siftYield, setSiftYield] = useState(null);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('extractionHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const calculateRosin = () => {
    if (!rosinMaterial || !rosinTemp || !rosinPressure) return;

    const weight = parseFloat(rosinMaterial);
    const temp = parseFloat(rosinTemp);
    const baseYield = Math.min(weight * 0.15 * (1 + (temp - 65) * 0.005), 0.285);
    const yieldGrams = (weight * baseYield).toFixed(2);
    const yieldPercent = (baseYield * 100).toFixed(1);

    let grade = '';
    if (temp < 80) grade = 'FULL MELT';
    else if (temp <= 100) grade = 'QUALITY';
    else grade = 'YIELD';

    setRosinYield({ grams: yieldGrams, percent: yieldPercent });
    setRosinGrade(grade);

    const entry = {
      type: 'rosin',
      material: weight,
      temp,
      pressure: parseFloat(rosinPressure),
      yield: yieldGrams,
      grade,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('extractionHistory', JSON.stringify(updated));
  };

  const calculateSift = () => {
    if (!siftScreen || !siftAmount) return;

    const micron = parseFloat(siftScreen);
    const amount = parseFloat(siftAmount);
    const yield_ = (amount * 0.03 * (1 + (120 - micron) * 0.001)).toFixed(2);

    setSiftYield(yield_);

    const entry = {
      type: 'sift',
      screen: micron,
      amount,
      yield: yield_,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('extractionHistory', JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1} className="pixel-h1 glow-pulse">{t('ext.title')}</h1>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Rosin Press Calculator</h2>
        <div style={styles.card} className="pixel-card">
          <input
            type="number"
            placeholder={t('ext.material')}
            value={rosinMaterial}
            onChange={(e) => setRosinMaterial(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <input
            type="number"
            placeholder={t('ext.temp')}
            value={rosinTemp}
            onChange={(e) => setRosinTemp(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <input
            type="number"
            placeholder={t('ext.pressure')}
            value={rosinPressure}
            onChange={(e) => setRosinPressure(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <button onClick={calculateRosin} className="pixel-btn" style={styles.btn}>
            {t('ext.calculate')}
          </button>

          {rosinYield && (
            <div style={styles.result}>
              <p style={styles.resultText}>Yield: {rosinYield.grams}g ({rosinYield.percent}%)</p>
              <span className="pixel-tag" style={getGradeStyle(rosinGrade)}>
                {rosinGrade}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Static Sift Simulator</h2>
        <div style={styles.card} className="pixel-card">
          <input
            type="number"
            placeholder={t('ext.micron')}
            value={siftScreen}
            onChange={(e) => setSiftScreen(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <input
            type="number"
            placeholder={t('ext.amount')}
            value={siftAmount}
            onChange={(e) => setSiftAmount(e.target.value)}
            className="pixel-input"
            style={styles.input}
          />
          <button onClick={calculateSift} className="pixel-btn" style={styles.btn}>
            {t('ext.calculate')}
          </button>

          {siftYield && (
            <p style={styles.resultText}>Estimated Yield: {siftYield}g</p>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Press Log</h2>
        <div style={styles.history}>
          {history.length === 0 ? (
            <p style={styles.empty}>{t('ext.nohistory')}</p>
          ) : (
            history.map((entry, idx) => (
              <div key={idx} style={styles.historyItem} className="pixel-card">
                <p style={styles.historyText}>
                  {entry.type === 'rosin'
                    ? `Rosin: ${entry.material}g @ ${formatTemp(entry.temp)} = ${entry.yield}g (${entry.grade})`
                    : `Sift: ${entry.screen}µ, ${entry.amount}g → ${entry.yield}g`}
                </p>
                <span style={styles.timestamp}>{entry.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#00ff00',
    padding: '20px',
    fontFamily: 'font-pixel',
    minHeight: '100vh',
  },
  h1: {
    fontSize: '32px',
    marginBottom: '20px',
    textShadow: '0 0 10px #00ff00',
  },
  h2: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#00e5ff',
  },
  section: {
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#1a1a1a',
    border: '4px solid #00ff00',
    padding: '15px',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    backgroundColor: '#121212',
    border: '2px solid #00ff00',
    color: '#00ff00',
    fontFamily: 'font-pixel',
  },
  btn: {
    backgroundColor: '#00ff00',
    color: '#121212',
    border: '3px solid #00ff00',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'font-pixel',
    marginBottom: '10px',
  },
  result: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#121212',
    border: '2px solid #00e5ff',
  },
  resultText: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  history: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  historyItem: {
    backgroundColor: '#1a1a1a',
    border: '2px solid #00ff00',
    padding: '10px',
  },
  historyText: {
    fontSize: '12px',
    margin: '0 0 5px 0',
  },
  timestamp: {
    fontSize: '10px',
    color: '#00e5ff',
  },
  empty: {
    color: '#888',
    fontSize: '14px',
  },
};

function getGradeStyle(grade) {
  const base = {
    padding: '4px 8px',
    fontSize: '12px',
    marginTop: '10px',
    display: 'inline-block',
    border: '2px solid',
  };

  if (grade === 'FULL MELT') {
    return { ...base, backgroundColor: '#00ff00', color: '#121212', borderColor: '#00ff00' };
  } else if (grade === 'QUALITY') {
    return { ...base, backgroundColor: '#ff9500', color: '#121212', borderColor: '#ff9500' };
  } else {
    return { ...base, backgroundColor: '#00e5ff', color: '#121212', borderColor: '#00e5ff' };
  }
}
