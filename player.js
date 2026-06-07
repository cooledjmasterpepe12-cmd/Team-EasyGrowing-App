// ═══════════════════════════════════════════════════════
//  TEAM EASYGROWING — Globaler Musik Player
//  Läuft auf allen Seiten, merkt sich Position via localStorage
// ═══════════════════════════════════════════════════════

const EG_TRACKS = [
    {
        title:  'Akapella',
        artist: 'TEAM EASYGROWING',
        src:    'music/akapella.mpeg',
        cover:  'https://lh3.googleusercontent.com/aida/AP1WRLv5Jd2ZqlkHyxR7KN4189O2WqeiFi5_ykcEuKzlHBkI17C03KdNFo4IfJs62DsQxnwxVYK_iK48HuK9o6zQ_ETwBbNkLd-AwoKF2AVIplR-qZtWs7Ec6c8iaA9hZqFdTgx70fH1JlZH07kbmtcGQM5Us4wYhyRB7fGfHe4x5A5jMBmKygb-hHZdCn-fiG9tLwPT6GoiIsNeiGgQwN2HTWqAgIjmx5UH3c99_Ka5mopDhXP1Ho9qm7Y_UaE'
    },
    {
        title:  'Hit From The Bong (Dobby & Pepe Remix)',
        artist: 'TEAM EASYGROWING',
        src:    'music/hit from the bong dobby und pepe remix.mpeg',
        cover:  'https://lh3.googleusercontent.com/aida/AP1WRLuPg4q2Wob3enSIKsMmYipEQ1xVjpOqRCsaNJbN0UonHRn_pGYK4qMbpND_ElpUXcSoFks_OCn0tssME3zarrZIDiXy7lAlTNVD2Jb8_2N5shpDMBCOWY5VhqI0rnpLiQn7Ol3kOOpcIG07ysZr7tn8tJe_nN2ehpD9SoQjFbl5kQ47EtXeHoQJWCN4IhYxAPKhN4z8sCpdge-35XyLT2fLEcaFvdawgIAToF0VMZTp8aqzFPhQGDrt1A'
    },
    {
        title:  'Keimei Rap',
        artist: 'TEAM EASYGROWING',
        src:    'music/keimei rap.mpeg',
        cover:  'https://lh3.googleusercontent.com/aida/AP1WRLunvBaVzDhtmTG3wd7B9JawK2VLceU9FZ6UADtW4LiMu7KbfgTrRAS9hz5bKXEE_GhZJMWR3rgTaN8-5nf0gal4FL270vMq7qYsjIYQRfShZpFqL-IPffsqrCYbVxFt67T0LX-EMhjJsq9ITTs7XQzfPpcItV6Rw_milibt4bc3DP9D53XBcuAVV-vUTiUyeK06BNxSaAl5yr-MpfIUP_J6U6gS712XDgxFrk0xJpVmpuWZLhl3-BhakvI'
    }
];

// ── State ────────────────────────────────────────────────
const egAudio = new Audio();
let egIndex     = parseInt(localStorage.getItem('eg_track') || '0');
let egPlaying   = false;
let egShuffle   = false;
let egRepeat    = false;

// Restore volume
egAudio.volume  = parseFloat(localStorage.getItem('eg_volume') || '0.8');

// ── Inject Mini Player HTML ──────────────────────────────
function egInjectPlayer() {
    if (document.getElementById('eg-mini-player')) return;

    const html = `
    <div id="eg-mini-player" style="
        position:fixed; bottom:72px; left:12px; right:12px; z-index:9999;
        background:rgba(30,32,30,0.92); backdrop-filter:blur(16px);
        border:1px solid rgba(161,212,148,0.2); border-radius:18px;
        box-shadow:0 0 24px rgba(161,212,148,0.1);
        padding:10px 14px 8px 14px; font-family:Inter,sans-serif;
        transition: transform 0.3s ease, opacity 0.3s ease;
    ">
      <!-- Top row -->
      <div style="display:flex; align-items:center; gap:10px;">
        <img id="eg-cover" src="" alt="Cover" style="
            width:42px; height:42px; border-radius:10px; object-fit:cover;
            flex-shrink:0; background:#1e201e;"/>
        <div style="flex:1; overflow:hidden;">
          <div id="eg-title" style="
              color:#e2e3df; font-size:13px; font-weight:600;
              white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              Kein Song ausgewählt
          </div>
          <div id="eg-artist" style="color:#a1d494; font-size:11px;">TEAM EASYGROWING</div>
        </div>
        <!-- Controls -->
        <div style="display:flex; align-items:center; gap:4px;">
          <button onclick="egToggleShuffle()" id="eg-btn-shuffle" style="
              background:none; border:none; cursor:pointer; padding:4px;
              color:#c2c9bb; border-radius:8px; line-height:1;" title="Shuffle">
            <span class="material-symbols-outlined" style="font-size:18px;">shuffle</span>
          </button>
          <button onclick="egPrev()" style="
              background:none; border:none; cursor:pointer; padding:4px;
              color:#e2e3df; border-radius:8px; line-height:1;">
            <span class="material-symbols-outlined" style="font-size:20px;">skip_previous</span>
          </button>
          <button onclick="egTogglePlay()" id="eg-play-btn" style="
              width:36px; height:36px; border-radius:50%;
              background:#a1d494; border:none; cursor:pointer;
              display:flex; align-items:center; justify-content:center;
              box-shadow:0 0 12px rgba(161,212,148,0.4);">
            <span class="material-symbols-outlined" id="eg-play-icon"
                  style="font-size:20px; color:#0a3909; font-variation-settings:'FILL' 1;">
              play_arrow
            </span>
          </button>
          <button onclick="egNext()" style="
              background:none; border:none; cursor:pointer; padding:4px;
              color:#e2e3df; border-radius:8px; line-height:1;">
            <span class="material-symbols-outlined" style="font-size:20px;">skip_next</span>
          </button>
          <button onclick="egToggleRepeat()" id="eg-btn-repeat" style="
              background:none; border:none; cursor:pointer; padding:4px;
              color:#c2c9bb; border-radius:8px; line-height:1;" title="Repeat">
            <span class="material-symbols-outlined" style="font-size:18px;">repeat</span>
          </button>
        </div>
      </div>
      <!-- Progress row -->
      <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
        <span id="eg-time" style="color:#8c9387; font-size:10px; width:72px;">0:00 / 0:00</span>
        <div id="eg-progress-bar" onclick="egSeek(event)" style="
            flex:1; height:4px; background:rgba(255,255,255,0.1);
            border-radius:4px; cursor:pointer; position:relative;">
          <div id="eg-progress-fill" style="
              height:100%; width:0%; background:#a1d494;
              border-radius:4px; transition:width 0.15s linear;
              box-shadow:0 0 6px rgba(161,212,148,0.6);"></div>
        </div>
        <input type="range" id="eg-volume" min="0" max="100"
               value="${Math.round(egAudio.volume*100)}"
               oninput="egSetVolume(this.value)"
               style="width:56px; accent-color:#a1d494; cursor:pointer;"/>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', html);
    egUpdateUI();
}

// ── Load Track ───────────────────────────────────────────
function egLoadTrack(index, autoPlay = true) {
    egIndex = index;
    const track = EG_TRACKS[index];
    egAudio.src = track.src;
    egAudio.load();
    localStorage.setItem('eg_track', index);

    // Restore saved position if same track on page reload
    const savedIdx  = parseInt(localStorage.getItem('eg_track') || '0');
    const savedTime = parseFloat(localStorage.getItem('eg_time') || '0');
    if (savedIdx === index && savedTime > 0) {
        egAudio.addEventListener('canplay', () => {
            egAudio.currentTime = savedTime;
        }, { once: true });
    }

    egUpdateUI();

    if (autoPlay) {
        egAudio.play()
            .then(() => { egPlaying = true; egUpdatePlayBtn(); })
            .catch(() => { egPlaying = false; egUpdatePlayBtn(); });
    }
}

// ── Controls ─────────────────────────────────────────────
function egTogglePlay() {
    if (egPlaying) {
        egAudio.pause();
        egPlaying = false;
    } else {
        egAudio.play()
            .then(() => { egPlaying = true; })
            .catch(() => { egPlaying = false; });
    }
    egUpdatePlayBtn();
}

function egPrev() {
    if (egAudio.currentTime > 3) {
        egAudio.currentTime = 0;
    } else {
        egLoadTrack((egIndex - 1 + EG_TRACKS.length) % EG_TRACKS.length);
    }
}

function egNext() {
    const next = egShuffle
        ? Math.floor(Math.random() * EG_TRACKS.length)
        : (egIndex + 1) % EG_TRACKS.length;
    egLoadTrack(next);
}

function egToggleShuffle() {
    egShuffle = !egShuffle;
    const btn = document.getElementById('eg-btn-shuffle');
    if (btn) btn.style.color = egShuffle ? '#a1d494' : '#c2c9bb';
}

function egToggleRepeat() {
    egRepeat = !egRepeat;
    egAudio.loop = egRepeat;
    const btn = document.getElementById('eg-btn-repeat');
    if (btn) btn.style.color = egRepeat ? '#a1d494' : '#c2c9bb';
}

function egSeek(e) {
    if (!egAudio.duration) return;
    const bar = document.getElementById('eg-progress-bar');
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    egAudio.currentTime = ((e.clientX - rect.left) / rect.width) * egAudio.duration;
}

function egSetVolume(val) {
    egAudio.volume = val / 100;
    localStorage.setItem('eg_volume', egAudio.volume);
}

// ── Public API for music.html ─────────────────────────────
function egPlayByIndex(index) {
    egLoadTrack(index, true);
}

// ── UI Updates ────────────────────────────────────────────
function egUpdatePlayBtn() {
    const icon = document.getElementById('eg-play-icon');
    if (icon) icon.textContent = egPlaying ? 'pause' : 'play_arrow';
}

function egUpdateUI() {
    const track = EG_TRACKS[egIndex];
    const cover  = document.getElementById('eg-cover');
    const title  = document.getElementById('eg-title');
    const artist = document.getElementById('eg-artist');
    if (cover)  cover.src           = track.cover;
    if (title)  title.textContent   = track.title;
    if (artist) artist.textContent  = track.artist;
    egUpdatePlayBtn();
}

// ── Audio Events ──────────────────────────────────────────
egAudio.addEventListener('timeupdate', () => {
    if (!egAudio.duration) return;
    const pct = (egAudio.currentTime / egAudio.duration) * 100;

    const fill = document.getElementById('eg-progress-fill');
    if (fill) fill.style.width = pct + '%';

    const time = document.getElementById('eg-time');
    if (time) time.textContent = egFmt(egAudio.currentTime) + ' / ' + egFmt(egAudio.duration);

    // Save position every 2 seconds
    if (Math.floor(egAudio.currentTime) % 2 === 0) {
        localStorage.setItem('eg_time', egAudio.currentTime);
    }
});

egAudio.addEventListener('play',  () => { egPlaying = true;  egUpdatePlayBtn(); });
egAudio.addEventListener('pause', () => { egPlaying = false; egUpdatePlayBtn(); });

egAudio.addEventListener('ended', () => {
    if (!egRepeat) {
        const next = egShuffle
            ? Math.floor(Math.random() * EG_TRACKS.length)
            : (egIndex + 1) % EG_TRACKS.length;
        egLoadTrack(next);
    }
});

function egFmt(s) {
    const m = Math.floor(s / 60);
    return m + ':' + Math.floor(s % 60).toString().padStart(2, '0');
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    egInjectPlayer();

    // Restore last track (but don't auto-play on page load)
    const savedIdx  = parseInt(localStorage.getItem('eg_track') || '0');
    const savedTime = parseFloat(localStorage.getItem('eg_time') || '0');
    const wasPlaying = localStorage.getItem('eg_was_playing') === 'true';

    egIndex = savedIdx;
    egAudio.src = EG_TRACKS[egIndex].src;
    egAudio.load();

    if (savedTime > 0) {
        egAudio.addEventListener('canplay', () => {
            egAudio.currentTime = savedTime;
            if (wasPlaying) {
                egAudio.play()
                    .then(() => { egPlaying = true; egUpdatePlayBtn(); })
                    .catch(() => {});
            }
        }, { once: true });
    }

    egUpdateUI();
});

// Save playing state before navigating away
window.addEventListener('beforeunload', () => {
    localStorage.setItem('eg_time', egAudio.currentTime);
    localStorage.setItem('eg_track', egIndex);
    localStorage.setItem('eg_was_playing', egPlaying);
});
