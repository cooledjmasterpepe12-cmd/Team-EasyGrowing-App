import { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useAuth } from '../core/auth';

export default function Register() {
  const { t } = useI18n();
  const { login, signup, adminLogin, isLoggedIn } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await login(email, password);
      if (!result.ok) setError(t(`err.${result.err}`) || result.err);
      else window.location.hash = '/';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signup(email, password, username);
      if (!result.ok) setError(t(`err.${result.err}`) || result.err);
      else window.location.hash = '/';
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await adminLogin(password);
      if (!result.ok) setError(result.err === 'invalid_password' ? 'Invalid admin password' : result.err);
      else window.location.hash = '/music';
    } catch (err) {
      setError(err.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    window.location.hash = '/';
    return null;
  }

  const tabBtn = (active, onClick, label, color = '#6ab86a', activeBg = '#1a3a1a') => (
    <button type="button" onClick={onClick} style={{
      flex: 1, padding: '8px',
      fontFamily: 'Press Start 2P, monospace', fontSize: '8px',
      border: '1px solid', borderColor: active ? color : '#1e3a1e',
      background: active ? activeBg : 'transparent',
      color: active ? color : '#4a6a4a',
      cursor: 'pointer', borderRadius: '4px',
      transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );

  return (
    <div style={{
      background: '#0c1a0c', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #142814, #0e1e0e)',
        border: '1px solid #2a4a2a',
        borderRadius: '10px',
        padding: '32px 28px',
        maxWidth: '400px', width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/Gemini_Generated_Image_2kqzqb2kqzqb2kqz.png" alt="EasyGrowing"
            style={{ width: '90px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(224,144,16,0.5))' }}
            onError={(e) => {
              e.target.src = '/logoteam.png';
              e.target.style.width = '70px';
              e.target.style.height = '70px';
            }} />
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '13px', color: '#6ab86a', marginTop: '10px', textShadow: '0 0 10px rgba(106,184,106,0.5)' }}>
            EASYGROWING
          </div>
          <div style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '7px', color: '#4a7a4a', marginTop: '6px' }}>
            BOTANICAL INTELLIGENCE
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {tabBtn(!isAdminMode && isLogin, () => { setIsAdminMode(false); setIsLogin(true); setError(null); }, 'LOGIN')}
          {tabBtn(!isAdminMode && !isLogin, () => { setIsAdminMode(false); setIsLogin(false); setError(null); }, 'REGISTER', '#20c8d8', '#0e1e2a')}
          {tabBtn(isAdminMode, () => { setIsAdminMode(true); setError(null); }, 'ADMIN', '#e09010', '#1a1200')}
        </div>

        {error && (
          <div style={{ background: 'rgba(80,0,0,0.4)', border: '1px solid #802020', borderRadius: '4px', padding: '10px', marginBottom: '16px' }}>
            <p style={{ color: '#ff8080', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={isAdminMode ? handleAdminLogin : (isLogin ? handleLogin : handleRegister)}>
          {isAdminMode ? (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#e09010', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '8px' }}>
                ADMIN PASSWORD
              </label>
              <input type="password" className="pixel-input" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          ) : (
            <>
              {!isLogin && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ color: '#7aaa7a', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '8px' }}>
                    {t('auth.username')}
                  </label>
                  <input type="text" className="pixel-input" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
              )}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ color: '#7aaa7a', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '8px' }}>
                  {t('auth.email')}
                </label>
                <input type="email" className="pixel-input" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#7aaa7a', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '8px' }}>
                  {t('auth.password')}
                </label>
                <input type="password" className="pixel-input" value={password}
                  onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              fontFamily: 'Press Start 2P, monospace', fontSize: '10px',
              border: '1px solid',
              borderColor: isAdminMode ? '#e09010' : (isLogin ? '#4a8c4a' : '#20c8d8'),
              background: isAdminMode ? 'rgba(100,60,0,0.4)' : (isLogin ? 'rgba(42,90,42,0.4)' : 'rgba(21,128,144,0.3)'),
              color: isAdminMode ? '#f0aa20' : (isLogin ? '#6ab86a' : '#20c8d8'),
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: '5px', opacity: loading ? 0.6 : 1,
              transition: 'all 0.15s',
            }}
          >
            {loading ? '...' : (isAdminMode ? 'LOGIN AS ADMIN' : (isLogin ? t('auth.login') : t('auth.register')))}
          </button>
        </form>

        {!isAdminMode && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p style={{ color: '#4a7a4a', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', margin: '0 0 8px 0' }}>
              {isLogin ? t('auth.no_account') : t('auth.have_account')}
            </p>
            <button type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); setEmail(''); setPassword(''); setUsername(''); }}
              style={{ background: 'transparent', color: '#6ab86a', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              {isLogin ? t('auth.create_account') : t('auth.login_instead')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
