import React, { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';

export default function IoT() {
  const { t } = useI18n();
  const { formatTemp } = useUnits();
  const [baseFreq, setBaseFreq] = useState(200);
  const [harmonic, setHarmonic] = useState(1);

  const devices = [
    { id: 'EG-BOX-01', status: 'Online', temp: 24.5, humidity: 58 },
    { id: 'EG-BOX-02', status: 'Online', temp: 23.8, humidity: 52 },
    { id: 'EG-BOX-03', status: 'Offline', temp: null, humidity: null },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.h1} className="pixel-h1 glow-pulse">{t('iot.title')}</h1>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Connected Devices</h2>
        <div style={styles.devicesGrid}>
          {devices.map((device) => (
            <div key={device.id} style={styles.deviceCard} className="pixel-card">
              <p style={styles.deviceId}>{device.id}</p>
              <p style={styles.deviceStatus(device.status)}>
                {device.status}
              </p>
              {device.status === 'Online' && (
                <>
                  <p style={styles.deviceData}>
                    🌡️ {formatTemp(device.temp)}
                  </p>
                  <p style={styles.deviceData}>
                    💧 {device.humidity}% RH
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Sensor Chart</h2>
        <div style={styles.card} className="pixel-card">
          <svg width="100%" height="150" viewBox="0 0 400 150" style={styles.svg}>
            <polyline
              points="0,120 50,110 100,95 150,85 200,80 250,90 300,100 350,115 400,125"
              style={{
                fill: 'none',
                stroke: '#00ff00',
                strokeWidth: '2',
              }}
            />
            <polyline
              points="0,100 50,90 100,75 150,65 200,70 250,80 300,95 350,110 400,120"
              style={{
                fill: 'none',
                stroke: '#cc00ff',
                strokeWidth: '2',
              }}
            />
            <text x="10" y="20" style={styles.svgText}>
              Temp (green) | Moisture (purple)
            </text>
          </svg>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Audio Frequency Experiment</h2>
        <div style={styles.card} className="pixel-card">
          <label style={styles.label}>
            Base Resonance: {baseFreq}Hz
          </label>
          <input
            type="range"
            min="200"
            max="800"
            value={baseFreq}
            onChange={(e) => setBaseFreq(parseInt(e.target.value))}
            style={styles.slider}
          />

          <label style={styles.label}>
            Harmonic Multiplier: {harmonic.toFixed(1)}x
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={harmonic}
            onChange={(e) => setHarmonic(parseFloat(e.target.value))}
            style={styles.slider}
          />

          <p style={styles.freqResult}>
            Harmonic Frequency: {(baseFreq * harmonic).toFixed(0)}Hz
          </p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Camera</h2>
        <div style={styles.card} className="pixel-card">
          <div style={styles.cameraPlaceholder}>
            <p style={styles.cameraText}>📷</p>
            <p style={styles.cameraLabel}>CAM 01 - LAB</p>
            <span className="pixel-tag" style={styles.cameraTag}>
              ACTIVE
            </span>
          </div>
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
    color: '#cc00ff',
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
  devicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
  },
  deviceCard: {
    backgroundColor: '#1a1a1a',
    border: '3px solid #00ff00',
    padding: '10px',
  },
  deviceId: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  deviceStatus: (status) => ({
    fontSize: '12px',
    marginBottom: '8px',
    color: status === 'Online' ? '#00ff00' : '#ff3333',
  }),
  deviceData: {
    fontSize: '12px',
    marginBottom: '4px',
  },
  svg: {
    backgroundColor: '#121212',
    border: '2px solid #00ff00',
  },
  svgText: {
    fontSize: '10px',
    fill: '#00ff00',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '8px',
    color: '#00ff00',
  },
  slider: {
    width: '100%',
    marginBottom: '15px',
    cursor: 'pointer',
  },
  freqResult: {
    fontSize: '14px',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#121212',
    border: '2px solid #cc00ff',
    color: '#cc00ff',
  },
  cameraPlaceholder: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#121212',
    border: '2px dashed #00ff00',
  },
  cameraText: {
    fontSize: '48px',
    margin: '0 0 10px 0',
  },
  cameraLabel: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  cameraTag: {
    display: 'inline-block',
    backgroundColor: '#00ff00',
    color: '#121212',
    padding: '4px 8px',
    border: '2px solid #00ff00',
    fontSize: '12px',
  },
};
