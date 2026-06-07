import React, { useState } from 'react';
import { useI18n } from '../core/i18n';

const STRAIN_DATA = {
  landraces: [
    { id: 'hindu-kush', name: 'Hindu Kush', type: 'Indica', origin: 'Afghanistan', parents: [] },
    { id: 'thai', name: 'Thai', type: 'Sativa', origin: 'Thailand', parents: [] },
    { id: 'afghani', name: 'Afghani', type: 'Indica', origin: 'Afghanistan', parents: [] },
    { id: 'acapulco-gold', name: 'Acapulco Gold', type: 'Sativa', origin: 'Mexico', parents: [] },
    { id: 'colombian-gold', name: 'Colombian Gold', type: 'Sativa', origin: 'Colombia', parents: [] },
  ],
  hybrids: [
    { id: 'rs11', name: 'RS11', type: 'Hybrid', parents: ['Pink Guava', 'OZK'] },
    { id: 'z-kiem', name: 'Z-Kiem', type: 'Hybrid', parents: ['Zkittlez', 'Kiwi Klip'] },
    { id: 'lemon-pastries', name: 'Lemon Pastries', type: 'Hybrid', parents: ['Lemon Tree', 'Wedding Cake'] },
    { id: 'space-jam', name: 'Space Jam', type: 'Hybrid', parents: ['Space Cake', 'Wedding Cake'] },
    { id: 'zqueeze', name: 'Zqueeze', type: 'Hybrid', parents: ['Zkittlez', 'Grape Ape'] },
  ],
};

export default function Genetics() {
  const { t } = useI18n();
  const [breederMode, setBreederMode] = useState(false);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [parentOne, setParentOne] = useState(null);
  const [parentTwo, setParentTwo] = useState(null);
  const [crossResult, setCrossResult] = useState(null);

  const allStrains = [...STRAIN_DATA.landraces, ...STRAIN_DATA.hybrids];

  const handleStrainClick = (strain) => {
    if (breederMode) {
      if (!parentOne) {
        setParentOne(strain);
      } else if (!parentTwo && strain.id !== parentOne.id) {
        setParentTwo(strain);
        setCrossResult({
          name: `${parentOne.name} x ${strain.name}`,
          type: 'Hybrid',
          parents: [parentOne.name, strain.name],
        });
      } else {
        setParentOne(strain);
        setParentTwo(null);
        setCrossResult(null);
      }
    } else {
      setSelectedStrain(selectedStrain?.id === strain.id ? null : strain);
    }
  };

  const resetBreeder = () => {
    setParentOne(null);
    setParentTwo(null);
    setCrossResult(null);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Indica':
        return '#00ff00';
      case 'Sativa':
        return '#00e5ff';
      case 'Hybrid':
        return '#ffaa00';
      default:
        return '#00ff00';
    }
  };

  const getTypeBgColor = (type) => {
    switch (type) {
      case 'Indica':
        return '#003300';
      case 'Sativa':
        return '#330033';
      case 'Hybrid':
        return '#332200';
      default:
        return '#003300';
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', minHeight: '100vh', padding: '20px', fontFamily: 'Press Start 2P' }}>
      <h1 className="pixel-h1" style={{ color: '#00ff00', marginBottom: '20px' }}>{t('gen.title')}</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', alignItems: 'center' }}>
        <button
          onClick={() => {
            setBreederMode(!breederMode);
            resetBreeder();
            setSelectedStrain(null);
          }}
          className="pixel-btn-cyan"
          style={{
            backgroundColor: breederMode ? '#00e5ff' : '#1a1a1a',
            color: breederMode ? '#121212' : '#00e5ff',
            border: '2px solid #00e5ff',
            padding: '10px 15px',
          }}
        >
          {breederMode ? 'BREEDER MODE ON' : 'BREEDER MODE'}
        </button>
        {breederMode && parentOne && (
          <span style={{ fontSize: '12px', color: '#cccccc' }}>
            {parentOne.name} {parentTwo ? `x ${parentTwo.name}` : '✕ ?'}
          </span>
        )}
      </div>

      {/* Landraces Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>LANDRACES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {STRAIN_DATA.landraces.map((strain) => (
            <div
              key={strain.id}
              onClick={() => handleStrainClick(strain)}
              className="pixel-card"
              style={{
                backgroundColor: selectedStrain?.id === strain.id || parentOne?.id === strain.id || parentTwo?.id === strain.id ? '#1a3a1a' : '#1a1a1a',
                border: `3px solid ${selectedStrain?.id === strain.id || parentOne?.id === strain.id || parentTwo?.id === strain.id ? '#ffff00' : getTypeColor(strain.type)}`,
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              <h3 className="pixel-h3" style={{ color: '#00ff00', marginBottom: '10px' }}>{strain.name}</h3>
              <div
                className="pixel-tag"
                style={{
                  backgroundColor: getTypeColor(strain.type),
                  color: '#121212',
                  padding: '5px 8px',
                  display: 'inline-block',
                  marginBottom: '10px',
                  fontSize: '10px',
                }}
              >
                {strain.type}
              </div>
              <p style={{ fontSize: '10px', color: '#888', marginTop: '10px' }}>Origin: {strain.origin}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hybrids Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 className="pixel-h2" style={{ color: '#00e5ff', marginBottom: '20px' }}>HYBRIDS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {STRAIN_DATA.hybrids.map((strain) => (
            <div
              key={strain.id}
              onClick={() => handleStrainClick(strain)}
              className="pixel-card"
              style={{
                backgroundColor: selectedStrain?.id === strain.id || parentOne?.id === strain.id || parentTwo?.id === strain.id ? '#1a3a1a' : '#1a1a1a',
                border: `3px solid ${selectedStrain?.id === strain.id || parentOne?.id === strain.id || parentTwo?.id === strain.id ? '#ffff00' : getTypeColor(strain.type)}`,
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              <h3 className="pixel-h3" style={{ color: '#00ff00', marginBottom: '10px' }}>{strain.name}</h3>
              <div
                className="pixel-tag"
                style={{
                  backgroundColor: getTypeColor(strain.type),
                  color: '#121212',
                  padding: '5px 8px',
                  display: 'inline-block',
                  marginBottom: '10px',
                  fontSize: '10px',
                }}
              >
                {strain.type}
              </div>
              <p style={{ fontSize: '10px', color: '#cccccc', marginTop: '10px' }}>
                {strain.parents.join(' × ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedStrain && !breederMode && (
        <div style={{ marginBottom: '40px' }}>
          <h2 className="pixel-h2" style={{ color: '#00ff00', marginBottom: '20px' }}>DETAILS</h2>
          <div
            className="pixel-card"
            style={{
              backgroundColor: '#1a1a1a',
              border: '4px solid #00ff00',
              padding: '20px',
            }}
          >
            <h3 className="pixel-h3" style={{ color: '#00e5ff', marginBottom: '15px' }}>{selectedStrain.name}</h3>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>Type:</span>
              <div
                className="pixel-tag"
                style={{
                  backgroundColor: getTypeColor(selectedStrain.type),
                  color: '#121212',
                  padding: '8px 12px',
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '10px',
                }}
              >
                {selectedStrain.type}
              </div>
            </div>
            {selectedStrain.origin && (
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>
                Origin: <span style={{ color: '#00ff00' }}>{selectedStrain.origin}</span>
              </p>
            )}
            {selectedStrain.parents.length > 0 && (
              <div>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Lineage:</p>
                <p style={{ fontSize: '12px', color: '#00e5ff' }}>{selectedStrain.parents.join(' × ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Breeder Cross Result */}
      {breederMode && crossResult && (
        <div style={{ marginBottom: '40px' }}>
          <h2 className="pixel-h2" style={{ color: '#ffaa00', marginBottom: '20px' }}>CROSS RESULT</h2>
          <div
            className="pixel-card"
            style={{
              backgroundColor: '#1a1a1a',
              border: '4px solid #ffaa00',
              padding: '20px',
            }}
          >
            <h3 className="pixel-h3" style={{ color: '#ffaa00', marginBottom: '15px' }}>{crossResult.name}</h3>
            <div
              className="pixel-tag"
              style={{
                backgroundColor: '#ffaa00',
                color: '#121212',
                padding: '8px 12px',
                display: 'inline-block',
                marginBottom: '15px',
                fontSize: '10px',
              }}
            >
              {crossResult.type}
            </div>
            <p style={{ fontSize: '12px', color: '#cccccc' }}>Hypothetical hybrid from selected parent strains.</p>
            <button
              onClick={resetBreeder}
              className="pixel-btn"
              style={{
                backgroundColor: '#00e5ff',
                color: '#121212',
                marginTop: '15px',
                padding: '8px 12px',
                fontSize: '10px',
              }}
            >
              CLEAR CROSS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
