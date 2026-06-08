import React, { useState } from 'react';
import { useI18n } from '../core/i18n';

export default function Doctor() {
  const { t } = useI18n();
  const [scanning, setScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleScan = () => {
    setScanning(true);
    setDiagnosis(null);

    setTimeout(() => {
      setDiagnosis({
        issues: [
          { name: 'Calcium Deficiency', severity: 'amber', certainty: 94 },
          { name: 'Over-fertilization', severity: 'red', certainty: 78 },
        ],
        countermeasures: [
          'Reduce fertilizer concentration to 50% recommended strength',
          'Perform partial water change (30%) with pH 6.2-6.8 water',
          'Increase air circulation and light duration to 14-16 hours',
        ],
      });
      setScanning(false);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1} className="pixel-h1 glow-pulse">{t('doc.title')}</h1>

      <div style={styles.section}>
        <h2 style={styles.h2} className="pixel-h2">Plant Diagnosis Scanner</h2>
        <div style={styles.uploadZone} className="pixel-card">
          <p style={styles.uploadText}>📷 Click to Scan Plant</p>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="pixel-btn"
            style={styles.scanBtn}
          >
            {scanning ? 'SCANNING...' : 'SCAN'}
          </button>

          {scanning && (
            <div style={styles.loadingContainer}>
              <div style={styles.loader} className="blink"></div>
              <p style={styles.loadingText}>Analyzing plant health...</p>
            </div>
          )}
        </div>
      </div>

      {diagnosis && (
        <>
          <div style={styles.section}>
            <h2 style={styles.h2} className="pixel-h2">Diagnosis Results</h2>
            <div style={styles.diagnosisGrid}>
              {diagnosis.issues.map((issue, idx) => (
                <div key={idx} style={styles.issueCard} className="pixel-card">
                  <p style={styles.issueName}>{issue.name}</p>
                  <div style={styles.certaintContainer}>
                    <div style={styles.certaintBar}>
                      <div
                        style={{
                          ...styles.certaintFill,
                          width: `${issue.certainty}%`,
                          backgroundColor: getIssueColor(issue.severity),
                        }}
                      ></div>
                    </div>
                    <p style={styles.certaintyText}>{issue.certainty}% certain</p>
                  </div>
                  <span
                    className="pixel-tag"
                    style={getIssueTagStyle(issue.severity)}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.h2} className="pixel-h2">Countermeasures</h2>
            <div style={styles.card} className="pixel-card">
              <ol style={styles.list}>
                {diagnosis.countermeasures.map((step, idx) => (
                  <li key={idx} style={styles.listItem}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.actionButtons}>
              <button className="pixel-btn" style={styles.diaryBtn}>
                {t('doc.addiary')}
              </button>
              <a
                href="https://easygrowing.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-amber"
                style={styles.shopBtn}
              >
                {t('doc.shopremedy')}
              </a>
            </div>
          </div>
        </>
      )}
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
  uploadZone: {
    backgroundColor: '#1a1a1a',
    border: '3px dashed #00ff00',
    padding: '40px 20px',
    textAlign: 'center',
  },
  uploadText: {
    fontSize: '18px',
    marginBottom: '15px',
  },
  scanBtn: {
    backgroundColor: '#00ff00',
    color: '#121212',
    border: '3px solid #00ff00',
    padding: '12px 30px',
    cursor: 'pointer',
    fontFamily: 'font-pixel',
    fontSize: '14px',
  },
  loadingContainer: {
    marginTop: '20px',
  },
  loader: {
    width: '30px',
    height: '30px',
    border: '3px solid #00ff00',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    margin: '0 auto 10px',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    fontSize: '12px',
    color: '#00e5ff',
  },
  card: {
    backgroundColor: '#1a1a1a',
    border: '4px solid #00ff00',
    padding: '15px',
  },
  diagnosisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
  },
  issueCard: {
    backgroundColor: '#1a1a1a',
    border: '3px solid #00e5ff',
    padding: '12px',
  },
  issueName: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#00e5ff',
  },
  certaintContainer: {
    marginBottom: '10px',
  },
  certaintBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#121212',
    border: '1px solid #00ff00',
    marginBottom: '5px',
    overflow: 'hidden',
  },
  certaintFill: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  certaintyText: {
    fontSize: '10px',
    color: '#888',
  },
  list: {
    listStyleType: 'decimal',
    marginLeft: '20px',
    fontSize: '14px',
    lineHeight: '1.8',
  },
  listItem: {
    marginBottom: '10px',
    color: '#00ff00',
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  diaryBtn: {
    backgroundColor: '#00ff00',
    color: '#121212',
    border: '3px solid #00ff00',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'font-pixel',
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
  },
  shopBtn: {
    backgroundColor: '#ff9500',
    color: '#121212',
    border: '3px solid #ff9500',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'font-pixel',
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
  },
};

function getIssueColor(severity) {
  if (severity === 'amber') return '#ff9500';
  if (severity === 'red') return '#ff3333';
  return '#00ff00';
}

function getIssueTagStyle(severity) {
  const baseStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    border: '2px solid',
    fontSize: '12px',
    marginTop: '8px',
  };

  if (severity === 'amber') {
    return {
      ...baseStyle,
      backgroundColor: '#ff9500',
      color: '#121212',
      borderColor: '#ff9500',
    };
  } else if (severity === 'red') {
    return {
      ...baseStyle,
      backgroundColor: '#ff3333',
      color: '#121212',
      borderColor: '#ff3333',
    };
  } else {
    return {
      ...baseStyle,
      backgroundColor: '#00ff00',
      color: '#121212',
      borderColor: '#00ff00',
    };
  }
}
