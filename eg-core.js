// ═══════════════════════════════════════════════════════
//  TEAM EASYGROWING — Core Module (Auth, DB, i18n, Units)
//  100% Offline / LocalStorage + IndexedDB
// ═══════════════════════════════════════════════════════

const EG = (() => {
  // ── Auth (LocalStorage) ────────────────────────────────────
  const Auth = {
    signup(username, email, password) {
      const users = JSON.parse(localStorage.getItem('eg_users') || '[]');
      if (users.find(u => u.email === email)) return { ok: false, err: 'email_exists' };
      if (users.find(u => u.username === username)) return { ok: false, err: 'username_exists' };
      if (password.length < 6) return { ok: false, err: 'weak_password' };
      const user = { id: Date.now().toString(36), username, email, password, created: Date.now() };
      users.push(user);
      localStorage.setItem('eg_users', JSON.stringify(users));
      const session = { id: user.id, username: user.username, email: user.email };
      localStorage.setItem('eg_session', JSON.stringify(session));
      localStorage.setItem('isLoggedIn', 'true');
      return { ok: true, user: session };
    },
    login(email, password) {
      const users = JSON.parse(localStorage.getItem('eg_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, err: 'invalid_credentials' };
      const session = { id: user.id, username: user.username, email: user.email };
      localStorage.setItem('eg_session', JSON.stringify(session));
      localStorage.setItem('isLoggedIn', 'true');
      return { ok: true, user: session };
    },
    logout() {
      localStorage.removeItem('eg_session');
      localStorage.removeItem('isLoggedIn');
    },
    getUser() {
      try { return JSON.parse(localStorage.getItem('eg_session')); } catch { return null; }
    },
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true' && this.getUser();
    },
    errorMessages: {
      de: { email_exists: 'Diese E-Mail ist bereits registriert.', username_exists: 'Benutzername bereits vergeben.', weak_password: 'Passwort muss mindestens 6 Zeichen haben.', invalid_credentials: 'E-Mail oder Passwort falsch.' },
      en: { email_exists: 'This email is already registered.', username_exists: 'Username already taken.', weak_password: 'Password must be at least 6 characters.', invalid_credentials: 'Invalid email or password.' },
      es: { email_exists: 'Este email ya está registrado.', username_exists: 'Nombre de usuario ya tomado.', weak_password: 'La contraseña debe tener al menos 6 caracteres.', invalid_credentials: 'Email o contraseña incorrectos.' }
    }
  };

  // ── IndexedDB (Grow Diary + Bible Notes) ───────────────────
  const DB = {
    _db: null,
    async init() {
      if (this._db) return this._db;
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('EasyGrowingDB', 3);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('plants')) {
            const ps = db.createObjectStore('plants', { keyPath: 'id' });
            ps.createIndex('userId', 'userId');
          }
          if (!db.objectStoreNames.contains('diaryLogs')) {
            const dl = db.createObjectStore('diaryLogs', { keyPath: 'id' });
            dl.createIndex('plantId', 'plantId');
            dl.createIndex('userId', 'userId');
          }
          if (!db.objectStoreNames.contains('bibleNotes')) {
            const bn = db.createObjectStore('bibleNotes', { keyPath: 'id' });
            bn.createIndex('userId', 'userId');
          }
          if (!db.objectStoreNames.contains('achievements')) {
            const ach = db.createObjectStore('achievements', { keyPath: 'id' });
            ach.createIndex('userId', 'userId');
          }
        };
        req.onsuccess = (e) => { this._db = e.target.result; resolve(this._db); };
        req.onerror = (e) => reject(e.target.error);
      });
    },
    async _tx(store, mode = 'readonly') {
      const db = await this.init();
      return db.transaction(store, mode).objectStore(store);
    },
    async add(store, data) {
      const s = await this._tx(store, 'readwrite');
      return new Promise((res, rej) => { const r = s.add(data); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    },
    async put(store, data) {
      const s = await this._tx(store, 'readwrite');
      return new Promise((res, rej) => { const r = s.put(data); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    },
    async get(store, id) {
      const s = await this._tx(store);
      return new Promise((res, rej) => { const r = s.get(id); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    },
    async getAll(store) {
      const s = await this._tx(store);
      return new Promise((res, rej) => { const r = s.getAll(); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    },
    async delete(store, id) {
      const s = await this._tx(store, 'readwrite');
      return new Promise((res, rej) => { const r = s.delete(id); r.onsuccess = () => res(); r.onerror = () => rej(r.error); });
    },
    async getByIndex(store, idx, val) {
      const s = await this._tx(store);
      return new Promise((res, rej) => { const r = s.index(idx).getAll(val); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    }
  };

  // ── i18n ───────────────────────────────────────────────────
  const I18N = {
    _dict: {
      de: {
        // Auth
        'auth.login': 'Login', 'auth.register': 'Registrieren', 'auth.email': 'E-Mail Adresse', 'auth.password': 'Passwort',
        'auth.username': 'Benutzername', 'auth.stayLoggedIn': 'Angemeldet bleiben', 'auth.forgotPw': 'Passwort vergessen?',
        'auth.or': 'ODER', 'auth.google': 'Mit Google fortfahren', 'auth.welcome': 'Willkommen in deinem digitalen Gewächshaus.',
        'auth.terms': 'Durch das Registrieren akzeptierst du unsere AGB und Datenschutzerklärung.',
        'auth.pwMin': 'Min. 8 Zeichen', 'auth.noAccount': 'Kein Konto?', 'auth.hasAccount': 'Schon ein Konto?',
        // Nav
        'nav.home': 'Home', 'nav.diary': 'Diary', 'nav.bible': 'Bible', 'nav.music': 'Music', 'nav.shop': 'Shop',
        'nav.community': 'Community', 'nav.tools': 'Tools', 'nav.profile': 'Profile', 'nav.admin': 'Admin',
        // Diary
        'diary.title': 'Grow Diary', 'diary.addPlant': 'Pflanze hinzufügen', 'diary.strain': 'Sorte',
        'diary.phase': 'Phase', 'diary.day': 'Tag', 'diary.notes': 'Notizen', 'diary.harvest': 'Ernte',
        'diary.save': 'Speichern', 'diary.cancel': 'Abbrechen', 'diary.delete': 'Löschen',
        'diary.germination': 'Keimung', 'diary.seedling': 'Sämling', 'diary.vegetative': 'Vegetativ',
        'diary.flowering': 'Blüte', 'diary.harvested': 'Ernte',
        'diary.noPlants': 'Noch keine Pflanzen. Tippe auf + um loszulegen!',
        'diary.addLog': 'Log hinzufügen', 'diary.watering': 'Gießen', 'diary.nutrients': 'Dünger',
        'diary.defoliation': 'Defoliation', 'diary.topping': 'Topping', 'diary.training': 'Training',
        'diary.pestControl': 'Schädlingsbekämpfung', 'diary.other': 'Sonstiges',
        // Bible
        'bible.title': 'Grow Bible', 'bible.search': 'Wissen von A-Z suchen...',
        'bible.mythbuster': 'Mythbuster', 'bible.myth.flushing': 'Flushing-Mythos',
        'bible.myth.flushing.desc': 'Professionelle Zierpflanzen benötigen Nahrung bis zur Ernte. Das Auswaschen von Nährstoffen ("Flushing") vor der Ernte ist wissenschaftlich nicht belegt und kann den Ertrag mindern. Pflanzen metabolisieren Nährstoffe kontinuierlich – ein Entzug schwächt die finalen Blüten.',
        'bible.myth.flushing.truth': 'Wahrheit: Nährstoffe bis zum Ende! Flushing mindert die Photosynthese-Leistung in der kritischen Endphase.',
        // Tools
        'tools.title': 'Grow-Rechner & Tools', 'tools.light': 'Licht-Rechner', 'tools.light.lux': 'Eingabewert (Lux)',
        'tools.light.ppfd': 'Ergebnis PPFD', 'tools.light.calc': 'Berechnen',
        'tools.fertilizer': 'Dünger-Rechner', 'tools.waterVolume': 'Wasservolumen',
        'tools.nutrientUnit': 'Dünger-Einheit', 'tools.waterUnit': 'Wasser-Einheit',
        'tools.metric': 'Metrisch', 'tools.imperial': 'Imperial',
        // Extraction
        'ext.title': 'Extraktions-Simulator',
        // Profile
        'profile.title': 'Grow Profile', 'profile.logout': 'Logout',
        'profile.language': 'Sprache', 'profile.tempUnit': 'Temperatur', 'profile.volumeUnit': 'Flüssigkeit',
      },
      en: {
        'auth.login': 'Login', 'auth.register': 'Register', 'auth.email': 'Email Address', 'auth.password': 'Password',
        'auth.username': 'Username', 'auth.stayLoggedIn': 'Stay logged in', 'auth.forgotPw': 'Forgot password?',
        'auth.or': 'OR', 'auth.google': 'Continue with Google', 'auth.welcome': 'Welcome to your digital greenhouse.',
        'auth.terms': 'By registering you accept our Terms and Privacy Policy.',
        'auth.pwMin': 'Min. 8 characters', 'auth.noAccount': "Don't have an account?", 'auth.hasAccount': 'Already have an account?',
        'nav.home': 'Home', 'nav.diary': 'Diary', 'nav.bible': 'Bible', 'nav.music': 'Music', 'nav.shop': 'Shop',
        'nav.community': 'Community', 'nav.tools': 'Tools', 'nav.profile': 'Profile', 'nav.admin': 'Admin',
        'diary.title': 'Grow Diary', 'diary.addPlant': 'Add Plant', 'diary.strain': 'Strain',
        'diary.phase': 'Phase', 'diary.day': 'Day', 'diary.notes': 'Notes', 'diary.harvest': 'Harvest',
        'diary.save': 'Save', 'diary.cancel': 'Cancel', 'diary.delete': 'Delete',
        'diary.germination': 'Germination', 'diary.seedling': 'Seedling', 'diary.vegetative': 'Vegetative',
        'diary.flowering': 'Flowering', 'diary.harvested': 'Harvested',
        'diary.noPlants': 'No plants yet. Tap + to get started!',
        'diary.addLog': 'Add Log', 'diary.watering': 'Watering', 'diary.nutrients': 'Nutrients',
        'diary.defoliation': 'Defoliation', 'diary.topping': 'Topping', 'diary.training': 'Training',
        'diary.pestControl': 'Pest Control', 'diary.other': 'Other',
        'bible.title': 'Grow Bible', 'bible.search': 'Search knowledge A-Z...',
        'bible.mythbuster': 'Mythbuster', 'bible.myth.flushing': 'Flushing Myth',
        'bible.myth.flushing.desc': 'Professional ornamental plants need nutrition until harvest. Flushing nutrients before harvest is not scientifically proven and can reduce yield. Plants metabolize nutrients continuously - deprivation weakens the final blooms.',
        'bible.myth.flushing.truth': 'Truth: Feed until the end! Flushing reduces photosynthesis performance in the critical final phase.',
        'tools.title': 'Grow Calculator & Tools', 'tools.light': 'Light Calculator', 'tools.light.lux': 'Input value (Lux)',
        'tools.light.ppfd': 'Result PPFD', 'tools.light.calc': 'Calculate',
        'tools.fertilizer': 'Fertilizer Calculator', 'tools.waterVolume': 'Water Volume',
        'tools.nutrientUnit': 'Nutrient Unit', 'tools.waterUnit': 'Water Unit',
        'tools.metric': 'Metric', 'tools.imperial': 'Imperial',
        'ext.title': 'Extraction Simulator',
        'profile.title': 'Grow Profile', 'profile.logout': 'Logout',
        'profile.language': 'Language', 'profile.tempUnit': 'Temperature', 'profile.volumeUnit': 'Volume',
      },
      es: {
        'auth.login': 'Iniciar sesión', 'auth.register': 'Registrarse', 'auth.email': 'Correo electrónico', 'auth.password': 'Contraseña',
        'auth.username': 'Nombre de usuario', 'auth.stayLoggedIn': 'Mantener sesión', 'auth.forgotPw': '¿Olvidaste la contraseña?',
        'auth.or': 'O', 'auth.google': 'Continuar con Google', 'auth.welcome': 'Bienvenido a tu invernadero digital.',
        'auth.terms': 'Al registrarte aceptas nuestros Términos y Política de Privacidad.',
        'auth.pwMin': 'Mín. 8 caracteres', 'auth.noAccount': '¿No tienes cuenta?', 'auth.hasAccount': '¿Ya tienes cuenta?',
        'nav.home': 'Inicio', 'nav.diary': 'Diario', 'nav.bible': 'Biblia', 'nav.music': 'Música', 'nav.shop': 'Tienda',
        'nav.community': 'Comunidad', 'nav.tools': 'Herramientas', 'nav.profile': 'Perfil', 'nav.admin': 'Admin',
        'diary.title': 'Diario de Cultivo', 'diary.addPlant': 'Añadir Planta', 'diary.strain': 'Variedad',
        'diary.phase': 'Fase', 'diary.day': 'Día', 'diary.notes': 'Notas', 'diary.harvest': 'Cosecha',
        'diary.save': 'Guardar', 'diary.cancel': 'Cancelar', 'diary.delete': 'Eliminar',
        'diary.germination': 'Germinación', 'diary.seedling': 'Plántula', 'diary.vegetative': 'Vegetativo',
        'diary.flowering': 'Floración', 'diary.harvested': 'Cosechado',
        'diary.noPlants': 'Sin plantas aún. Toca + para empezar.',
        'diary.addLog': 'Añadir Registro', 'diary.watering': 'Riego', 'diary.nutrients': 'Nutrientes',
        'diary.defoliation': 'Defoliación', 'diary.topping': 'Topping', 'diary.training': 'Entrenamiento',
        'diary.pestControl': 'Control de plagas', 'diary.other': 'Otro',
        'bible.title': 'Biblia del Cultivo', 'bible.search': 'Buscar conocimiento A-Z...',
        'bible.mythbuster': 'Cazamitos', 'bible.myth.flushing': 'Mito del Flushing',
        'bible.myth.flushing.desc': 'Las plantas ornamentales profesionales necesitan nutrición hasta la cosecha. El lavado de nutrientes antes de la cosecha no está científicamente probado y puede reducir el rendimiento.',
        'bible.myth.flushing.truth': 'Verdad: ¡Alimenta hasta el final! El flushing reduce el rendimiento de la fotosíntesis en la fase final crítica.',
        'tools.title': 'Calculadoras y Herramientas', 'tools.light': 'Calculadora de Luz', 'tools.light.lux': 'Valor de entrada (Lux)',
        'tools.light.ppfd': 'Resultado PPFD', 'tools.light.calc': 'Calcular',
        'tools.fertilizer': 'Calculadora de Fertilizante', 'tools.waterVolume': 'Volumen de Agua',
        'tools.nutrientUnit': 'Unidad de Nutriente', 'tools.waterUnit': 'Unidad de Agua',
        'tools.metric': 'Métrico', 'tools.imperial': 'Imperial',
        'ext.title': 'Simulador de Extracción',
        'profile.title': 'Perfil de Cultivo', 'profile.logout': 'Cerrar sesión',
        'profile.language': 'Idioma', 'profile.tempUnit': 'Temperatura', 'profile.volumeUnit': 'Volumen',
      }
    },
    t(key, lang) {
      const l = lang || Units.getLang();
      return (this._dict[l] && this._dict[l][key]) || (this._dict.en[key]) || key;
    }
  };

  // ── Units ──────────────────────────────────────────────────
  const Units = {
    getLang() { return localStorage.getItem('eg_lang') || 'de'; },
    setLang(l) { localStorage.setItem('eg_lang', l); localStorage.setItem('lang', l); },
    getMode() { return localStorage.getItem('eg_units') || 'metric'; },
    setMode(m) { localStorage.setItem('eg_units', m); localStorage.setItem('units', m); },
    cToF(c) { return (c * 9/5 + 32).toFixed(1); },
    fToC(f) { return ((f - 32) * 5/9).toFixed(1); },
    lToGal(l) { return (l * 0.264172).toFixed(2); },
    galToL(g) { return (g * 3.78541).toFixed(2); },
    mlToFlOz(ml) { return (ml * 0.033814).toFixed(2); },
    flOzToMl(oz) { return (oz * 29.5735).toFixed(1); },
    formatTemp(c) { return this.getMode() === 'imperial' ? `${this.cToF(c)}°F` : `${c}°C`; },
    formatVol(ml) {
      if (this.getMode() === 'imperial') return `${this.mlToFlOz(ml)} fl oz`;
      return ml >= 1000 ? `${(ml/1000).toFixed(1)}L` : `${ml}ml`;
    },
    formatWater(l) {
      return this.getMode() === 'imperial' ? `${this.lToGal(l)} gal` : `${l}L`;
    }
  };

  // ── Init DB on load ─────────────────────────────────────────
  if (typeof window !== 'undefined') {
    DB.init().catch(console.error);
  }

  return { Auth, DB, I18N, Units };
})();
