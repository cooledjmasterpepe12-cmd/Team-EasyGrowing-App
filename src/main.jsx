import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './core/auth';
import { DBProvider } from './core/db';
import { I18nProvider } from './core/i18n';
import { UnitsProvider } from './core/units';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DBProvider>
        <I18nProvider>
          <UnitsProvider>
            <App />
          </UnitsProvider>
        </I18nProvider>
      </DBProvider>
    </AuthProvider>
  </StrictMode>
);
