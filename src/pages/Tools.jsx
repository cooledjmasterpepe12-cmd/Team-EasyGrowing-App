import React, { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';

const LIGHT_SOURCES = {
  LED: 0.0145,
  HPS: 0.0125,
  CMH: 0.013,
  Sunlight: 0.0185,
};

const FERTILIZER_PRESETS = {
  'Biobizz Grow': 2,
  'Bio Heaven': 1,
  'Top Max': 0.5,
};

export default function Tools() {
  const { t } = useI18n();
  const { formatTemp, formatVol, formatWater, isMetric, mode, setMode, mlToFlOz, lToGal } = useUnits();

  // Light Calculator State
  const [lightLux, setLightLux] = useState(50000);
  const [lightSource, setLightSource] = useState('LED');
  const [lightHours, setLightHours] = useState(18);
  const [lightResult, setLightResult] = useState(null);

  // Fertilizer Calculator State
  const [fertVolume, setFertVolume] = useState(1000);
  const [fertDoseRate, setFertDoseRate] = useState(2);
  const [fertNutrients, setFertNutrients] = useState(1);
  const [fertResult, setFertResult] = useState(null);

  // VPD Calculator State
  const [vpdTemp, setVpdTemp] = useState(25);
  const [vpdHumidity, setVpdHumidity] = useState(65);
  const [vpdResult, setVpdResult] = useState(null);

  // Light Calculator
  const calculateLight = () => {
    const factor = LIGHT_SOURCES[lightSource];
    const ppfd = lightLux * factor;
    const dli = (ppfd * lightHours * 3600) / 1000000;
    setLightResult({ ppfd, dli });
  };

  // Fertilizer Calculator
  const calculateFertilizer = () => {
    const totalDose = fertVolume * (fertDoseRate / 1000);
    const dosePer200ml = (200 * fertDoseRate) / 1000;
    setFertResult({ totalDose, dosePer200ml });
  };

  // VPD Calculator
  const calculateVpd = () => {
    const t = vpdTemp;
    const svp = 0.61078 * Math.exp((17.27 * t) / (t + 237.3));
    const vpd = svp * (1 - vpdHumidity / 100);
    setVpdResult(vpd);
  };

  const getPPFDColor = (ppfd) => {
    if (ppfd >= 200 && ppfd <= 800) return '#00ff00';
    if (ppfd < 200) return '#ffff00';
    return '#ff0000';
  };

  const getVPDColor = (vpd) => {
    if (vpd >= 0.8 && vpd <= 1.2) return '#00ff00';
    if (vpd < 0.8) return '#ffff00';
    return '#ff0000';
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'Press Start 2P' }}>
      <h1 className="pixel-h1" style={{ color: '#00ff00', marginBottom: '40px' }}>{t('tools.title')}</h1>

      {/* Unit Toggle */}
      <div style={{ marginBottom: '40px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span>{isMetric ? 'Metric' : 'Imperial'}</span>
        <button className="pixel-btn" onClick={() => setMode(isMetric ? 'imperial' : 'metric')} style={{ backgroundColor: '#cc00ff', color: '#121212' }}>
          {isMetric ? 'Switch' : 'Switch'}
        </button>
      </div>

      {/* Light Calculator */}
      <div className="pixel-card" style={{ backgroundColor: '#1a1a1a', border: '4px solid #00ff00', marginBottom: '40px', padding: '20px' }}>
        <h2 className="pixel-h2" style={{ color: '#cc00ff' }}>Light Calculator</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Lux Value</label>
          <input
            type="number"
            value={lightLux}
            onChange={(e) => setLightLux(parseFloat(e.target.value))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #00ff00', padding: '8px' }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Light Source</label>
          <select
            value={lightSource}
            onChange={(e) => setLightSource(e.target.value)}
            className="pixel-select"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #cc00ff', padding: '8px' }}
          >
            {Object.keys(LIGHT_SOURCES).map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <label style={{ display: 'block', marginBottom: '5px' }}>Hours of Light</label>
          <input
            type="number"
            value={lightHours}
            onChange={(e) => setLightHours(parseFloat(e.target.value))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #00ff00', padding: '8px' }}
          />
        </div>

        <button onClick={calculateLight} className="pixel-btn" style={{ backgroundColor: '#00ff00', color: '#121212', marginBottom: '20px', width: '100%' }}>
          CALCULATE
        </button>

        {lightResult && (
          <div style={{ backgroundColor: '#121212', border: '2px solid #00ff00', padding: '15px' }}>
            <p style={{ marginBottom: '10px' }}>
              PPFD: <span style={{ color: getPPFDColor(lightResult.ppfd) }}>{lightResult.ppfd.toFixed(2)} µmol/m²/s</span>
            </p>
            <div style={{ backgroundColor: '#000', height: '20px', border: '2px solid #00ff00', marginBottom: '10px', overflow: 'hidden' }}>
              <div className="progress-bar-fill" style={{ width: `${Math.min((lightResult.ppfd / 1000) * 100, 100)}%`, height: '100%', backgroundColor: getPPFDColor(lightResult.ppfd) }}></div>
            </div>
            <p>DLI: <span style={{ color: '#00ff00' }}>{lightResult.dli.toFixed(2)} mol/m²/day</span></p>
          </div>
        )}
      </div>

      {/* Fertilizer Calculator */}
      <div className="pixel-card" style={{ backgroundColor: '#1a1a1a', border: '4px solid #cc00ff', marginBottom: '40px', padding: '20px' }}>
        <h2 className="pixel-h2" style={{ color: '#00ff00' }}>Fertilizer Calculator</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Volume ({isMetric ? 'ml' : 'fl oz'})</label>
          <input
            type="number"
            value={isMetric ? fertVolume : mlToFlOz(fertVolume)}
            onChange={(e) => setFertVolume(isMetric ? parseFloat(e.target.value) : mlToFlOz(parseFloat(e.target.value)))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #cc00ff', padding: '8px' }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Dose Rate (ml/L)</label>
          <input
            type="number"
            value={fertDoseRate}
            onChange={(e) => setFertDoseRate(parseFloat(e.target.value))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #cc00ff', padding: '8px' }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Presets</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            {Object.entries(FERTILIZER_PRESETS).map(([name, dose]) => (
              <button
                key={name}
                onClick={() => setFertDoseRate(dose)}
                className="pixel-btn-amber"
                style={{ backgroundColor: '#ffaa00', color: '#121212', padding: '8px', fontSize: '10px' }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <button onClick={calculateFertilizer} className="pixel-btn" style={{ backgroundColor: '#00ff00', color: '#121212', marginBottom: '20px', width: '100%' }}>
          CALCULATE
        </button>

        {fertResult && (
          <div style={{ backgroundColor: '#121212', border: '2px solid #cc00ff', padding: '15px' }}>
            <p style={{ marginBottom: '10px' }}>Total Dose: <span style={{ color: '#cc00ff' }}>{fertResult.totalDose.toFixed(2)} ml</span></p>
            <p>Per 200ml: <span style={{ color: '#cc00ff' }}>{fertResult.dosePer200ml.toFixed(2)} ml</span></p>
          </div>
        )}
      </div>

      {/* VPD Calculator */}
      <div className="pixel-card" style={{ backgroundColor: '#1a1a1a', border: '4px solid #00ff00', marginBottom: '40px', padding: '20px' }}>
        <h2 className="pixel-h2" style={{ color: '#cc00ff' }}>VPD Calculator</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Temperature (°C)</label>
          <input
            type="number"
            value={vpdTemp}
            onChange={(e) => setVpdTemp(parseFloat(e.target.value))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #00ff00', padding: '8px' }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Humidity (%)</label>
          <input
            type="number"
            value={vpdHumidity}
            onChange={(e) => setVpdHumidity(Math.min(100, Math.max(0, parseFloat(e.target.value))))}
            className="pixel-input"
            style={{ width: '100%', marginBottom: '10px', backgroundColor: '#121212', color: '#00ff00', border: '2px solid #00ff00', padding: '8px' }}
            min="0"
            max="100"
          />
        </div>

        <button onClick={calculateVpd} className="pixel-btn" style={{ backgroundColor: '#00ff00', color: '#121212', marginBottom: '20px', width: '100%' }}>
          CALCULATE
        </button>

        {vpdResult !== null && (
          <div style={{ backgroundColor: '#121212', border: '2px solid #00ff00', padding: '15px' }}>
            <p style={{ marginBottom: '10px' }}>
              VPD: <span className="pixel-tag" style={{ backgroundColor: getVPDColor(vpdResult), color: '#121212', padding: '8px', display: 'inline-block' }}>
                {vpdResult.toFixed(2)} kPa
              </span>
            </p>
            <p style={{ fontSize: '12px', color: '#888' }}>
              {vpdResult >= 0.8 && vpdResult <= 1.2 ? 'OPTIMAL' : vpdResult < 0.8 ? 'LOW - INCREASE RH' : 'HIGH - LOWER RH'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
