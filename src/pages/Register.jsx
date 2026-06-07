import { useState } from 'react';
import { useI18n } from '../core/i18n';
import { useAuth } from '../core/auth';

export default function Register() {
  const { t } = useI18n();
  const { login, signup, isLoggedIn } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
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
      if (!result.ok) {
        setError(t(`err.${result.err}`) || result.err);
      } else {
        window.location.hash = '/';
      }
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
      if (!result.ok) {
        setError(t(`err.${result.err}`) || result.err);
      } else {
        window.location.hash = '/';
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    window.location.hash = '/';
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="pixel-card" style={{
        backgroundColor: '#1a1a1a',
        borderLeft: '4px solid #00ff00',
        borderTop: '4px solid #00ff00',
        borderRight: '2px solid #00e5ff',
        borderBottom: '2px solid #00e5ff',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <h2 className="pixel-h2" style={{
          color: '#00ff00',
          marginTop: 0,
          marginBottom: '8px',
          fontSize: '16px',
          textAlign: 'center',
        }}>
          {isLogin ? t('auth.login') : t('auth.register')}
        </h2>

        <p style={{
          color: '#00e5ff',
          fontFamily: 'Press Start 2P, monospace',
          fontSize: '8px',
          textAlign: 'center',
          marginBottom: '25px',
        }}>
          {t('auth.welcome')}
        </p>

        {error && (
          <div style={{
            backgroundColor: '#2a0000',
            borderLeft: '2px solid #ff3333',
            padding: '10px',
            marginBottom: '15px',
          }}>
            <p style={{ color: '#ff6b6b', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '6px' }}>
                {t('auth.username')}
              </label>
              <input type="text" className="pixel-input" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '6px' }}>
              {t('auth.email')}
            </label>
            <input type="email" className="pixel-input" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '8px', display: 'block', marginBottom: '6px' }}>
              {t('auth.password')}
            </label>
            <input type="password" className="pixel-input" value={password}
              onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          <button type="submit" className={isLogin ? 'pixel-btn' : 'pixel-btn-cyan'}
            disabled={loading}
            style={{ width: '100%', padding: '12px', marginBottom: '10px', opacity: loading ? 0.6 : 1 }}>
            {loading ? t('auth.loading') : (isLogin ? t('auth.login') : t('auth.register'))}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p style={{ color: '#00e5ff', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', margin: '0 0 8px 0' }}>
            {isLogin ? t('auth.no_account') : t('auth.have_account')}
          </p>
          <button type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); setEmail(''); setPassword(''); setUsername(''); }}
            style={{ backgroundColor: 'transparent', color: '#00ff00', fontFamily: 'Press Start 2P, monospace', fontSize: '7px', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            {isLogin ? t('auth.create_account') : t('auth.login_instead')}
          </button>
        </div>
      </div>

      <div className="scanline" style={{ pointerEvents: 'none' }} />
    </div>
  );
}
