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
      await login(email, password);
      window.location.hash = '/';
    } catch (err) {
      setError(err.message || t('auth.error.login') || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(email, password, username);
      window.location.hash = '/';
    } catch (err) {
      if (err.email_exists) {
        setError(t('auth.error.email_exists') || 'Email already exists');
      } else if (err.username_exists) {
        setError(t('auth.error.username_exists') || 'Username already taken');
      } else {
        setError(err.message || t('auth.error.register') || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    window.location.hash = '/';
  };

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
        borderRight: '2px solid #cc00ff',
        borderBottom: '2px solid #cc00ff',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <h2 className="pixel-h2" style={{
          color: '#00ff00',
          marginTop: '0',
          marginBottom: '8px',
          fontSize: '16px',
          textAlign: 'center',
        }}>
          {isLogin ? t('auth.login') || 'LOGIN' : t('auth.register') || 'REGISTER'}
        </h2>

        <p style={{
          color: '#cc00ff',
          fontFamily: 'Press Start 2P, monospace',
          fontSize: '8px',
          textAlign: 'center',
          marginBottom: '25px',
        }}>
          {t('auth.welcome') || 'WELCOME TO TEAM EASYGROWING'}
        </p>

        {error && (
          <div style={{
            backgroundColor: '#2a0000',
            borderLeft: '2px solid #ff0000',
            borderTop: '2px solid #ff0000',
            borderRight: '1px solid #cc00ff',
            borderBottom: '1px solid #cc00ff',
            padding: '10px',
            marginBottom: '15px',
          }}>
            <p style={{
              color: '#ff6b6b',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '7px',
              margin: '0',
            }}>
              ERROR: {error}
            </p>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                color: '#00ff00',
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '8px',
                display: 'block',
                marginBottom: '6px',
              }}>
                {t('auth.username') || 'USERNAME'}
              </label>
              <input
                type="text"
                className="pixel-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#0a0a0a',
                  borderLeft: '2px solid #00ff00',
                  borderTop: '2px solid #00ff00',
                  borderRight: '1px solid #cc00ff',
                  borderBottom: '1px solid #cc00ff',
                  color: '#00ff00',
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '8px',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              color: '#00ff00',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '8px',
              display: 'block',
              marginBottom: '6px',
            }}>
              {t('auth.email') || 'EMAIL'}
            </label>
            <input
              type="email"
              className="pixel-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0a0a0a',
                borderLeft: '2px solid #00ff00',
                borderTop: '2px solid #00ff00',
                borderRight: '1px solid #cc00ff',
                borderBottom: '1px solid #cc00ff',
                color: '#00ff00',
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '8px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              color: '#00ff00',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '8px',
              display: 'block',
              marginBottom: '6px',
            }}>
              {t('auth.password') || 'PASSWORD'}
            </label>
            <input
              type="password"
              className="pixel-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0a0a0a',
                borderLeft: '2px solid #00ff00',
                borderTop: '2px solid #00ff00',
                borderRight: '1px solid #cc00ff',
                borderBottom: '1px solid #cc00ff',
                color: '#00ff00',
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '8px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <button
            type="submit"
            className={isLogin ? 'pixel-btn' : 'pixel-btn-purple'}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '10px',
              backgroundColor: isLogin ? '#00ff00' : '#cc00ff',
              color: '#121212',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '8px',
              fontWeight: 'bold',
              borderLeft: '2px solid #ffffff',
              borderTop: '2px solid #ffffff',
              borderRight: '1px solid #000000',
              borderBottom: '1px solid #000000',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? t('auth.loading') || 'LOADING...' : (isLogin ? t('auth.login') || 'LOGIN' : t('auth.register') || 'REGISTER')}
          </button>
        </form>

        <button
          className="pixel-btn-amber"
          onClick={handleGuest}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#ffaa00',
            color: '#121212',
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '7px',
            fontWeight: 'bold',
            borderLeft: '2px solid #ffff00',
            borderTop: '2px solid #ffff00',
            borderRight: '1px solid #000000',
            borderBottom: '1px solid #000000',
            cursor: 'pointer',
          }}
        >
          {t('auth.guest') || 'CONTINUE AS GUEST'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: '#cc00ff',
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '7px',
            margin: '0',
          }}>
            {isLogin ? t('auth.no_account') || "DON'T HAVE AN ACCOUNT?" : t('auth.have_account') || 'ALREADY HAVE AN ACCOUNT?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setEmail('');
              setPassword('');
              setUsername('');
            }}
            style={{
              backgroundColor: 'transparent',
              color: '#00ff00',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '7px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginTop: '6px',
            }}
          >
            {isLogin ? t('auth.create_account') || 'CREATE ONE' : t('auth.login_instead') || 'LOGIN INSTEAD'}
          </button>
        </div>
      </div>

      <div className="scanline" style={{ pointerEvents: 'none' }} />
    </div>
  );
}
