import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../core/i18n';
import { useAuth } from '../core/auth';
import { useDB } from '../core/db';

const PHASES = ['germination', 'seedling', 'vegetative', 'flowering', 'harvested'];
const LOG_TYPES = ['watering', 'nutrients', 'defoliation', 'topping', 'training', 'other'];

export default function Diary() {
  const { t } = useI18n();
  const { user, isLoggedIn } = useAuth();
  const { add, getAll, delete: dbDelete, getByIndex, uploadPhoto } = useDB();
  const fileInputRef = useRef(null);

  const [plants, setPlants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedPlantId, setExpandedPlantId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({ strain: '', phase: 'seedling', startDate: '', notes: '' });
  const [logData, setLogData] = useState({ type: 'watering', amount: '', notes: '' });
  const [photoData, setPhotoData] = useState({ cadence: 'daily', caption: '', dayNumber: '' });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) loadPlants();
  }, [isLoggedIn]);

  const loadPlants = async () => {
    const data = await getAll('plants');
    setPlants(data || []);
  };

  const loadLogs = async (plantId) => {
    const data = await getByIndex('diary_logs', 'plant_id', plantId);
    setLogs(data || []);
  };

  const loadPhotos = async (plantId) => {
    const data = await getByIndex('plant_photos', 'plant_id', plantId);
    setPhotos(data || []);
  };

  const handleAddPlant = async () => {
    if (!formData.strain || !formData.startDate) return;
    await add('plants', {
      strain: formData.strain,
      phase: formData.phase,
      start_date: formData.startDate,
      notes: formData.notes,
    });
    setFormData({ strain: '', phase: 'seedling', startDate: '', notes: '' });
    setShowForm(false);
    loadPlants();
  };

  const handleDeletePlant = async (id) => {
    await dbDelete('plants', id);
    const plantLogs = await getByIndex('diary_logs', 'plant_id', id);
    for (const log of plantLogs || []) {
      await dbDelete('diary_logs', log.id);
    }
    const plantPhotos = await getByIndex('plant_photos', 'plant_id', id);
    for (const photo of plantPhotos || []) {
      await dbDelete('plant_photos', photo.id);
    }
    setExpandedPlantId(null);
    loadPlants();
  };

  const handleAddLog = async () => {
    if (!logData.type || !expandedPlantId) return;
    await add('diary_logs', {
      plant_id: expandedPlantId,
      log_type: logData.type,
      amount: logData.amount,
      notes: logData.notes,
    });
    setLogData({ type: 'watering', amount: '', notes: '' });
    setShowLogForm(false);
    loadLogs(expandedPlantId);
  };

  const handlePhotoUpload = async () => {
    if (!photoFile || !expandedPlantId) return;
    setUploading(true);
    try {
      const photoUrl = await uploadPhoto(photoFile, expandedPlantId);
      const dayNum = photoData.dayNumber ? parseInt(photoData.dayNumber) : getDayCount(plants.find(p => p.id === expandedPlantId)?.start_date);
      await add('plant_photos', {
        plant_id: expandedPlantId,
        photo_url: photoUrl,
        caption: photoData.caption,
        cadence: photoData.cadence,
        day_number: dayNum,
      });
      setPhotoData({ cadence: 'daily', caption: '', dayNumber: '' });
      setPhotoFile(null);
      setShowPhotoForm(false);
      loadPhotos(expandedPlantId);
    } catch (err) {
      console.error('Photo upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const getDayCount = (startDate) => {
    if (!startDate) return 0;
    return Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
  };

  const handleExpandPlant = (plantId) => {
    if (expandedPlantId === plantId) {
      setExpandedPlantId(null);
      setShowLogForm(false);
      setShowPhotoForm(false);
    } else {
      setExpandedPlantId(plantId);
      setShowLogForm(false);
      setShowPhotoForm(false);
      loadLogs(plantId);
      loadPhotos(plantId);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="pixel-container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h1 className="pixel-h1">{t('diary.title')}</h1>
        <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '10px', marginTop: '20px' }}>
          {t('auth.welcome')}
        </p>
        <button className="pixel-btn" onClick={() => window.location.hash = '/register'} style={{ marginTop: '20px' }}>
          {t('auth.login')}
        </button>
      </div>
    );
  }

  return (
    <div className="pixel-container">
      <h1 className="pixel-h1">{t('diary.title')}</h1>

      <button className="pixel-btn" onClick={() => setShowForm(!showForm)}>
        {t('diary.add')}
      </button>

      {showForm && (
        <div className="pixel-card" style={{ marginTop: '16px' }}>
          <input type="text" className="pixel-input" placeholder={t('diary.strain')}
            value={formData.strain} onChange={(e) => setFormData({ ...formData, strain: e.target.value })} />
          <select className="pixel-select" value={formData.phase} style={{ marginTop: '10px', width: '100%' }}
            onChange={(e) => setFormData({ ...formData, phase: e.target.value })}>
            {PHASES.map(p => <option key={p} value={p}>{t(`diary.phase.${p}`)}</option>)}
          </select>
          <input type="date" className="pixel-input" style={{ marginTop: '10px' }}
            value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
          <textarea className="pixel-input" placeholder={t('diary.notes')} rows="4" style={{ marginTop: '10px' }}
            value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
          <button className="pixel-btn" onClick={handleAddPlant} style={{ marginTop: '10px' }}>
            {t('diary.save')}
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {plants.length === 0 && (
          <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '10px' }}>
            {t('diary.noPlants')}
          </p>
        )}

        {plants.map((plant) => (
          <div key={plant.id} className="pixel-card" style={{ marginBottom: '12px' }}>
            <div onClick={() => handleExpandPlant(plant.id)} style={{ cursor: 'pointer' }}>
              <h2 className="pixel-h2">{plant.strain}</h2>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="pixel-tag">{t(`diary.phase.${plant.phase}`)}</span>
                <span className="pixel-tag-cyan">{getDayCount(plant.start_date)} {t('diary.days')}</span>
              </div>
            </div>

            {expandedPlantId === plant.id && (
              <div style={{ marginTop: '12px', borderTop: '2px solid #00ff00', paddingTop: '12px' }}>
                {plant.notes && <p style={{ color: '#00ff00', marginBottom: '12px' }}>{plant.notes}</p>}

                <h3 className="pixel-h3">{t('diary.photos')}</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <button className="pixel-btn" onClick={() => setShowPhotoForm(!showPhotoForm)} style={{ fontSize: '8px' }}>
                    {t('diary.addPhoto')}
                  </button>
                </div>

                {showPhotoForm && (
                  <div className="pixel-card" style={{ marginBottom: '12px', borderColor: '#00e5ff' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <button className={photoData.cadence === 'daily' ? 'pixel-btn' : 'pixel-btn-cyan'}
                        onClick={() => setPhotoData({ ...photoData, cadence: 'daily' })} style={{ fontSize: '8px' }}>
                        {t('diary.daily')}
                      </button>
                      <button className={photoData.cadence === 'weekly' ? 'pixel-btn' : 'pixel-btn-cyan'}
                        onClick={() => setPhotoData({ ...photoData, cadence: 'weekly' })} style={{ fontSize: '8px' }}>
                        {t('diary.weekly')}
                      </button>
                    </div>
                    <input type="number" className="pixel-input" placeholder={`${t('diary.dayNum')} #`}
                      value={photoData.dayNumber}
                      onChange={(e) => setPhotoData({ ...photoData, dayNumber: e.target.value })} />
                    <input type="text" className="pixel-input" placeholder={t('diary.photoCaption')}
                      value={photoData.caption} style={{ marginTop: '8px' }}
                      onChange={(e) => setPhotoData({ ...photoData, caption: e.target.value })} />
                    <div style={{ marginTop: '8px' }}>
                      <input type="file" accept="image/*" ref={fileInputRef}
                        onChange={(e) => setPhotoFile(e.target.files[0])}
                        style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px' }} />
                    </div>
                    <button className="pixel-btn-cyan" onClick={handlePhotoUpload}
                      disabled={uploading || !photoFile}
                      style={{ marginTop: '8px', opacity: (uploading || !photoFile) ? 0.5 : 1 }}>
                      {uploading ? '...' : t('diary.save')}
                    </button>
                  </div>
                )}

                {photos.length > 0 && (
                  <div className="photo-grid" style={{ marginBottom: '12px' }}>
                    {photos.map((photo) => (
                      <div key={photo.id} style={{ position: 'relative' }}>
                        <img src={photo.photo_url} alt={photo.caption || `Day ${photo.day_number}`}
                          style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', border: '2px solid #00ff00' }} />
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          backgroundColor: 'rgba(0,0,0,0.8)', padding: '2px 4px',
                          fontFamily: 'Press Start 2P, monospace', fontSize: '6px', color: '#00e5ff',
                        }}>
                          {t('diary.dayNum')} {photo.day_number} | {photo.cadence === 'daily' ? t('diary.daily') : t('diary.weekly')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="pixel-h3">{t('diary.logs')}</h3>
                <button className="pixel-btn" onClick={() => setShowLogForm(!showLogForm)} style={{ fontSize: '8px' }}>
                  {t('diary.addLog')}
                </button>

                {showLogForm && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px solid #00e5ff' }}>
                    <select className="pixel-select" value={logData.type} style={{ width: '100%' }}
                      onChange={(e) => setLogData({ ...logData, type: e.target.value })}>
                      {LOG_TYPES.map(lt => <option key={lt} value={lt}>{t(`diary.log.${lt}`)}</option>)}
                    </select>
                    <input type="text" className="pixel-input" placeholder={t('diary.amount')}
                      value={logData.amount} style={{ marginTop: '8px' }}
                      onChange={(e) => setLogData({ ...logData, amount: e.target.value })} />
                    <textarea className="pixel-input" placeholder={t('diary.notes')} rows="3"
                      value={logData.notes} style={{ marginTop: '8px' }}
                      onChange={(e) => setLogData({ ...logData, notes: e.target.value })} />
                    <button className="pixel-btn" onClick={handleAddLog} style={{ marginTop: '8px' }}>
                      {t('diary.saveLog')}
                    </button>
                  </div>
                )}

                <div style={{ marginTop: '12px' }}>
                  {logs.map((log) => (
                    <div key={log.id} style={{ marginBottom: '8px', paddingLeft: '8px', borderLeft: '4px solid #00e5ff' }}>
                      <span className="pixel-tag">{t(`diary.log.${log.log_type}`)}</span>
                      {log.amount && <span style={{ color: '#00ff00', marginLeft: '8px' }}>{log.amount}</span>}
                      {log.notes && <p style={{ color: '#00e5ff', fontSize: '12px', marginTop: '4px' }}>{log.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button className="pixel-btn" onClick={() => handleExpandPlant(plant.id)} style={{ fontSize: '8px' }}>
                {expandedPlantId === plant.id ? t('diary.collapse') : t('diary.expand')}
              </button>
              <button className="pixel-btn-red" onClick={() => handleDeletePlant(plant.id)} style={{ fontSize: '8px' }}>
                {t('diary.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
