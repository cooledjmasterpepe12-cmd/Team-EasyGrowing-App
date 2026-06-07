import React, { useState, useEffect } from 'react';
import { useI18n } from '../core/i18n';
import { useUnits } from '../core/units';
import { useAuth } from '../core/auth';
import { useDB } from '../core/db';


export default function Diary() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { add, put, getAll, delete: dbDelete, getByIndex } = useDB();
  const [plants, setPlants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedPlantId, setExpandedPlantId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const userId = user?.id || 'guest';

  const [formData, setFormData] = useState({ strain: '', phase: 'seedling', startDate: '', notes: '' });
  const [logData, setLogData] = useState({ type: 'watering', amount: '', notes: '' });

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    const data = await getAll('plants');
    const userPlants = data.filter(p => p.userId === userId);
    setPlants(userPlants);
  };

  const loadLogs = async (plantId) => {
    const data = await getByIndex('diaryLogs', 'plantId', plantId);
    setLogs(data || []);
  };

  const handleAddPlant = async () => {
    if (!formData.strain || !formData.startDate) return;
    await add('plants', { ...formData, userId, id: Date.now() });
    setFormData({ strain: '', phase: 'seedling', startDate: '', notes: '' });
    setShowForm(false);
    loadPlants();
  };

  const handleDeletePlant = async (id) => {
    await dbDelete('plants', id);
    const diaryLogs = await getByIndex('diaryLogs', 'plantId', id);
    for (const log of diaryLogs || []) {
      await dbDelete('diaryLogs', log.id);
    }
    loadPlants();
  };

  const handleAddLog = async () => {
    if (!logData.type || !expandedPlantId) return;
    await add('diaryLogs', { ...logData, plantId: expandedPlantId, userId, id: Date.now(), timestamp: new Date() });
    setLogData({ type: 'watering', amount: '', notes: '' });
    loadLogs(expandedPlantId);
  };

  const getDayCount = (startDate) => {
    return Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
  };

  const handleExpandPlant = (plantId) => {
    if (expandedPlantId === plantId) {
      setExpandedPlantId(null);
      setShowLogForm(false);
    } else {
      setExpandedPlantId(plantId);
      setShowLogForm(false);
      loadLogs(plantId);
    }
  };

  return (
    <div className="pixel-container">
      <h1 className="pixel-h1">{t('diary.title')}</h1>

      <button className="pixel-btn" onClick={() => setShowForm(!showForm)}>
        {t('diary.add')}
      </button>

      {showForm && (
        <div className="pixel-card" style={{ marginTop: '16px' }}>
          <input
            type="text"
            className="pixel-input"
            placeholder={t('diary.strain')}
            value={formData.strain}
            onChange={(e) => setFormData({ ...formData, strain: e.target.value })}
          />
          <select
            className="pixel-select"
            value={formData.phase}
            onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
          >
            <option value="germination">{t('diary.phase.germination')}</option>
            <option value="seedling">{t('diary.phase.seedling')}</option>
            <option value="vegetative">{t('diary.phase.vegetative')}</option>
            <option value="flowering">{t('diary.phase.flowering')}</option>
            <option value="harvested">{t('diary.phase.harvested')}</option>
          </select>
          <input
            type="date"
            className="pixel-input"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
          <textarea
            className="pixel-input"
            placeholder={t('diary.notes')}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="4"
          />
          <button className="pixel-btn" onClick={handleAddPlant}>
            {t('diary.save')}
          </button>
        </div>
      )}

      <div className="plants-list" style={{ marginTop: '20px' }}>
        {plants.map((plant) => (
          <div key={plant.id} className="pixel-card" style={{ marginBottom: '12px' }}>
            <div onClick={() => handleExpandPlant(plant.id)} style={{ cursor: 'pointer' }}>
              <h2 className="pixel-h2">{plant.strain}</h2>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="pixel-tag">{t(`diary.phase.${plant.phase}`)}</span>
                <span className="pixel-tag-purple">{getDayCount(plant.startDate)} {t('diary.days')}</span>
              </div>
            </div>

            {expandedPlantId === plant.id && (
              <div style={{ marginTop: '12px', borderTop: '2px solid #00ff00', paddingTop: '12px' }}>
                {plant.notes && <p style={{ color: '#00ff00', marginBottom: '12px' }}>{plant.notes}</p>}

                <h3 className="pixel-h3">{t('diary.logs')}</h3>
                <button className="pixel-btn" onClick={() => setShowLogForm(!showLogForm)}>
                  {t('diary.addLog')}
                </button>

                {showLogForm && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px solid #cc00ff' }}>
                    <select
                      className="pixel-select"
                      value={logData.type}
                      onChange={(e) => setLogData({ ...logData, type: e.target.value })}
                    >
                      <option value="watering">{t('diary.log.watering')}</option>
                      <option value="nutrients">{t('diary.log.nutrients')}</option>
                      <option value="defoliation">{t('diary.log.defoliation')}</option>
                      <option value="topping">{t('diary.log.topping')}</option>
                      <option value="training">{t('diary.log.training')}</option>
                      <option value="other">{t('diary.log.other')}</option>
                    </select>
                    <input
                      type="text"
                      className="pixel-input"
                      placeholder={t('diary.amount')}
                      value={logData.amount}
                      onChange={(e) => setLogData({ ...logData, amount: e.target.value })}
                    />
                    <textarea
                      className="pixel-input"
                      placeholder={t('diary.notes')}
                      value={logData.notes}
                      onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
                      rows="3"
                    />
                    <button className="pixel-btn" onClick={handleAddLog}>
                      {t('diary.saveLog')}
                    </button>
                  </div>
                )}

                <div style={{ marginTop: '12px' }}>
                  {logs.map((log) => (
                    <div key={log.id} style={{ marginBottom: '8px', paddingLeft: '8px', borderLeft: '4px solid #00ff00' }}>
                      <span className="pixel-tag">{t(`diary.log.${log.type}`)}</span>
                      {log.amount && <span style={{ color: '#00ff00', marginLeft: '8px' }}>{log.amount}</span>}
                      {log.notes && <p style={{ color: '#cc00ff', fontSize: '12px', marginTop: '4px' }}>{log.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button className="pixel-btn" onClick={() => handleExpandPlant(plant.id)}>
                {expandedPlantId === plant.id ? t('diary.collapse') : t('diary.expand')}
              </button>
              <button className="pixel-btn-purple" onClick={() => handleDeletePlant(plant.id)}>
                {t('diary.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
