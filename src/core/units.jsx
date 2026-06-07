import { createContext, useContext, useState, useCallback } from 'react';

const UnitsContext = createContext(null);

export function UnitsProvider({ children }) {
  const [mode, setModeState] = useState(() => localStorage.getItem('eg_units') || 'metric');
  const setMode = (m) => { localStorage.setItem('eg_units', m); localStorage.setItem('units', m); setModeState(m); };
  const isMetric = mode === 'metric';

  const cToF = (c) => (c * 9 / 5 + 32).toFixed(1);
  const fToC = (f) => ((f - 32) * 5 / 9).toFixed(1);
  const lToGal = (l) => (l * 0.264172).toFixed(2);
  const galToL = (g) => (g * 3.78541).toFixed(2);
  const mlToFlOz = (ml) => (ml * 0.033814).toFixed(2);

  const formatTemp = useCallback((c) => isMetric ? `${c}°C` : `${cToF(c)}°F`, [isMetric]);
  const formatVol = useCallback((ml) => isMetric
    ? (ml >= 1000 ? `${(ml / 1000).toFixed(1)}L` : `${ml}ml`)
    : `${mlToFlOz(ml)} fl oz`, [isMetric]);
  const formatWater = useCallback((l) => isMetric ? `${l}L` : `${lToGal(l)} gal`, [isMetric]);

  return (
    <UnitsContext.Provider value={{ mode, setMode, isMetric, cToF, fToC, lToGal, galToL, mlToFlOz, formatTemp, formatVol, formatWater }}>
      {children}
    </UnitsContext.Provider>
  );
}

export const useUnits = () => useContext(UnitsContext);
