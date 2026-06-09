import React, { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';

export default function B2B() {
  const { t } = useI18n();
  const { mode, setMode, formatTemp, isMetric } = useUnits();
  const [sqFootage, setSqFootage] = useState(10000);
  const [ppfd, setPpfd] = useState(800);
  const opEx = (sqFootage / 1000) * (ppfd / 100) * 450;
  const yield_ = (sqFootage / 100) * 2.5;

  return (
    <div style={{ background: '#0c1a0c', color: '#6ab86a', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1 className="pixel-h1">{t('b2b.title')}</h1>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'MEMBERS', value: '15,420' },
          { label: 'IoT BOXES', value: '4,892' },
          { label: 'REPORTS', value: '0' },
          { label: 'UPTIME', value: '99.98%' }
        ].map((m, i) => (
          <div key={i} className="pixel-card" style={{ border: '3px solid #6ab86a', padding: '20px', background: '#122212' }}>
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>{m.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#20c8d8' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Facility Consumption Chart */}
      <div className="pixel-card" style={{ border: '3px solid #6ab86a', padding: '20px', background: '#122212', marginBottom: '40px' }}>
        <h2 className="pixel-h2">Facility Consumption</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', marginTop: '20px' }}>
          {[45, 78, 62, 88, 55, 91, 70].map((h, i) => (
            <div key={i} style={{ flex: 1, background: '#6ab86a', height: `${h}%`, border: '2px solid #20c8d8' }} />
          ))}
        </div>
      </div>

      {/* ROI Predictor & Scaling Strategy */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <div className="pixel-card-cyan" style={{ border: '3px solid #20c8d8', padding: '20px', background: '#122212' }}>
          <h3 className="pixel-h3">ROI Predictor</h3>
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
            <div style={{ marginBottom: '10px' }}>Scaling Target: <span style={{ color: '#20c8d8' }}>$450k</span></div>
            <div>Profit Margin: <span style={{ color: '#6ab86a' }}>38%</span></div>
          </div>
        </div>

        <div className="pixel-card-cyan" style={{ border: '3px solid #20c8d8', padding: '20px', background: '#122212' }}>
          <h3 className="pixel-h3">Scaling Strategy</h3>
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label>Sq Footage: {sqFootage}</label>
              <input type="range" min="1000" max="50000" value={sqFootage} onChange={(e) => setSqFootage(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>PPFD: {ppfd}</label>
              <input type="range" min="200" max="1500" value={ppfd} onChange={(e) => setPpfd(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div style={{ color: '#6ab86a' }}>OpEx: ${opEx.toFixed(0)} | Yield: {yield_.toFixed(1)}kg</div>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="pixel-card" style={{ border: '3px solid #6ab86a', padding: '20px', background: '#122212', marginBottom: '40px', overflowX: 'auto' }}>
        <h3 className="pixel-h3">Purchase Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #6ab86a' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Batch</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Qty</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'PO-001', batch: 'Batch-A', qty: 500, price: '$2,450', status: 'SHIPPED' },
              { id: 'PO-002', batch: 'Batch-B', qty: 300, price: '$1,890', status: 'PROCESSING' },
              { id: 'PO-003', batch: 'Batch-C', qty: 750, price: '$3,750', status: 'PENDING' }
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #20c8d8' }}>
                <td style={{ padding: '10px' }}>{row.id}</td>
                <td style={{ padding: '10px' }}>{row.batch}</td>
                <td style={{ padding: '10px' }}>{row.qty}</td>
                <td style={{ padding: '10px' }}>{row.price}</td>
                <td style={{ padding: '10px', color: '#6ab86a' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <button className="pixel-btn-amber" style={{ padding: '12px 24px', fontSize: '14px', border: '3px solid #ffaa00', background: '#122212', color: '#ffaa00', cursor: 'pointer' }}>
        EXPORT REPORT
      </button>
    </div>
  );
}
