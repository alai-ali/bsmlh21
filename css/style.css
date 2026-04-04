:root {
  --green: #21A038;
  --green-light: #E8F5EC;
  --green-dark: #178030;
  --white: #FFFFFF;
  --bg: #F5F7F5;
  --text: #1A1A1A;
  --text2: #6B7280;
  --border: #E2E8E2;
  --card: #FFFFFF;
  --shadow: 0 2px 12px rgba(33,160,56,0.10);
  --shadow2: 0 4px 24px rgba(0,0,0,0.08);
  --r: 16px;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bot: env(safe-area-inset-bottom, 0px);
}

* { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; -webkit-font-smoothing:antialiased; }
html, body { height:100%; overflow:hidden; background:var(--bg); color:var(--text); font-family:var(--font); }

/* ── SPLASH ── */
#splash {
  position:fixed; inset:0; z-index:9999;
  background:var(--white);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
}
#splash.gone { display:none !important; }
.sp-logo { width:80px; height:80px; background:var(--green); border-radius:24px; display:flex; align-items:center; justify-content:center; }
.sp-logo svg { width:48px; height:48px; fill:white; }
.sp-title { font-size:28px; font-weight:900; color:var(--text); letter-spacing:1px; }
.sp-sub { font-size:13px; color:var(--text2); font-weight:500; }
.sp-bar { width:160px; height:3px; background:var(--border); border-radius:99px; overflow:hidden; margin-top:8px; }
.sp-fill { height:100%; width:0%; background:var(--green); border-radius:99px; transition:width 1.5s ease; }

/* ── ОНБОРДИНГ ── */
.scr {
  position:fixed; inset:0; z-index:8000;
  background:var(--white);
  display:none; flex-direction:column;
  padding:calc(var(--safe-top) + 60px) 24px calc(var(--safe-bot) + 24px);
  overflow-y:auto;
}
.scr.on { display:flex; }
.scr-logo { width:44px; height:44px; background:var(--green); border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:32px; }
.scr-logo svg { width:26px; height:26px; fill:white; }
.scr-step { font-size:11px; font-weight:600; color:var(--green); letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
.scr-h { font-size:28px; font-weight:900; color:var(--text); line-height:1.2; margin-bottom:8px; }
.scr-p { font-size:14px; color:var(--text2); line-height:1.6; margin-bottom:32px; }
.steps-row { display:flex; gap:6px; margin-bottom:32px; }
.step-dot { height:4px; flex:1; background:var(--border); border-radius:99px; }
.step-dot.on { background:var(--green); }

/* ── КНОПКИ ── */
.btn {
  width:100%; padding:16px; font-size:15px; font-weight:700; font-family:var(--font);
  background:var(--green); color:white; border:none; border-radius:var(--r);
  cursor:pointer; transition:background .15s, transform .1s; margin-bottom:10px;
}
.btn:active { background:var(--green-dark); transform:scale(0.98); }
.btn-ghost {
  width:100%; padding:14px; font-size:14px; font-weight:600; font-family:var(--font);
  background:transparent; color:var(--text2); border:1.5px solid var(--border);
  border-radius:var(--r); cursor:pointer; transition:all .15s;
}
.btn-ghost:active { border-color:var(--green); color:var(--green); }

/* ── ИНПУТЫ ── */
.inp {
  width:100%; padding:16px; font-size:16px; font-family:var(--font);
  background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r);
  color:var(--text); outline:none; transition:border-color .2s; margin-bottom:12px;
}
.inp:focus { border-color:var(--green); }
.inp::placeholder { color:#B0B8B0; }

/* ── APP ── */
#app { display:none; position:fixed; inset:0; flex-direction:column; background:var(--bg); }
#app.on { display:flex; }

.app-head {
  background:var(--white);
  padding:calc(var(--safe-top) + 12px) 20px 12px;
  display:flex; align-items:center; justify-content:space-between;
  border-bottom:1px solid var(--border); flex-shrink:0;
}
.head-logo { display:flex; align-items:center; gap:10px; }
.head-logo-icon { width:32px; height:32px; background:var(--green); border-radius:8px; display:flex; align-items:center; justify-content:center; }
.head-logo-icon svg { width:18px; height:18px; fill:white; }
.head-title { font-size:18px; font-weight:900; color:var(--text); }
.head-avatar { width:36px; height:36px; border-radius:50%; background:var(--green-light); border:2px solid var(--green); overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.head-avatar img { width:100%; height:100%; object-fit:cover; }
.head-avatar-ph { font-size:14px; font-weight:700; color:var(--green); }

.app-body { flex:1; overflow-y:auto; padding:16px 16px calc(var(--safe-bot) + 80px); }

/* ── НАВБАР ── */
.navbar {
  position:fixed; bottom:0; left:0; right:0;
  background:var(--white); border-top:1px solid var(--border);
  display:flex; padding:8px 0 calc(var(--safe-bot) + 8px);
  z-index:1000;
}
.nav-btn { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; padding:4px 0; background:none; border:none; }
.nav-btn svg { width:22px; height:22px; fill:var(--text2); }
.nav-btn span { font-size:10px; font-weight:600; color:var(--text2); font-family:var(--font); }
.nav-btn.on svg { fill:var(--green); }
.nav-btn.on span { color:var(--green); }

/* ── КАРТОЧКИ ── */
.card { background:var(--card); border-radius:var(--r); padding:16px; margin-bottom:12px; box-shadow:var(--shadow2); }
.card-title { font-size:13px; font-weight:600; color:var(--text2); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.5px; }
.card-value { font-size:22px; font-weight:900; color:var(--text); }
.section-title { font-size:13px; font-weight:700; color:var(--text2); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:12px; margin-top:8px; }

/* HUID карточка */
.id-card { background:linear-gradient(135deg,var(--green) 0%,var(--green-dark) 100%); border-radius:20px; padding:20px; margin-bottom:16px; color:white; }
.id-card-name { font-size:20px; font-weight:900; margin-bottom:4px; }
.id-card-huid { font-size:11px; opacity:0.8; letter-spacing:1px; margin-bottom:16px; }
.id-card-bottom { display:flex; justify-content:space-between; align-items:flex-end; }
.id-card-label { font-size:10px; opacity:0.7; text-transform:uppercase; letter-spacing:1px; }
.id-card-chip { width:32px; height:24px; background:rgba(255,255,255,0.3); border-radius:4px; }

/* ── СТРАНИЦЫ ── */
.pg { display:none; position:fixed; inset:0; z-index:2000; background:var(--bg); flex-direction:column; }
.pg.on { display:flex; }
.pg-head { background:var(--white); padding:calc(var(--safe-top) + 16px) 20px 16px; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border); flex-shrink:0; }
.pg-back { width:36px; height:36px; background:var(--bg); border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.pg-back svg { width:18px; height:18px; fill:var(--text); }
.pg-head-title { font-size:17px; font-weight:700; color:var(--text); }
.pg-body { flex:1; overflow-y:auto; padding:16px; }

/* ── NFC ── */
.nfc-card { background:var(--green-light); border-radius:24px; padding:32px; display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:24px; }
.nfc-icon { width:80px; height:80px; background:var(--green); border-radius:50%; display:flex; align-items:center; justify-content:center; }
.nfc-icon svg { width:40px; height:40px; fill:white; }
.nfc-label { font-size:13px; font-weight:600; color:var(--green); letter-spacing:1px; }
.nfc-status { font-size:13px; color:var(--text2); min-height:20px; text-align:center; }

/* ── SMS ── */
.phone-prefix { display:flex; align-items:center; gap:10px; background:var(--bg); border:1.5px solid var(--border); border-radius:var(--r); padding:0 16px; margin-bottom:12px; }
.prefix-flag { font-size:20px; }
.prefix-code { font-size:15px; font-weight:600; color:var(--text); padding:16px 0; }
.prefix-sep { width:1px; height:24px; background:var(--border); }
.prefix-inp { flex:1; padding:16px 0 16px 12px; font-size:16px; font-family:var(--font); background:none; border:none; outline:none; color:var(--text); }

/* ── СЕРВИСЫ ── */
.svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
.svc-item { background:var(--white); border-radius:var(--r); padding:16px 12px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; box-shadow:var(--shadow2); transition:transform .1s; }
.svc-item:active { transform:scale(0.97); }
.svc-icon { width:44px; height:44px; border-radius:12px; background:var(--green-light); display:flex; align-items:center; justify-content:center; }
.svc-icon svg { width:22px; height:22px; fill:var(--green); }
.svc-name { font-size:12px; font-weight:600; color:var(--text); text-align:center; }

/* ── ЧАТ ── */
.chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }
.msg { max-width:80%; padding:10px 14px; border-radius:16px; font-size:14px; line-height:1.5; }
.msg.bot { background:var(--white); color:var(--text); border-bottom-left-radius:4px; box-shadow:var(--shadow2); align-self:flex-start; }
.msg.user { background:var(--green); color:white; border-bottom-right-radius:4px; align-self:flex-end; }
.chat-input-row { display:flex; gap:8px; padding:12px 16px calc(var(--safe-bot) + 12px); background:var(--white); border-top:1px solid var(--border); }
.chat-inp { flex:1; padding:10px 14px; font-size:14px; font-family:var(--font); background:var(--bg); border:1.5px solid var(--border); border-radius:99px; color:var(--text); outline:none; }
.chat-inp:focus { border-color:var(--green); }
.chat-send { width:40px; height:40px; background:var(--green); border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; }
.chat-send svg { width:18px; height:18px; fill:white; }

/* ── ФИД ── */
.feed-item { background:var(--white); border-radius:var(--r); padding:16px; margin-bottom:10px; box-shadow:var(--shadow2); }
.feed-tag { display:inline-block; font-size:10px; font-weight:700; background:var(--green-light); color:var(--green); padding:3px 8px; border-radius:99px; margin-bottom:8px; }
.feed-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:6px; line-height:1.4; }
.feed-meta { font-size:12px; color:var(--text2); }

/* ── ПРОФИЛЬ ── */
.prof-hero { background:linear-gradient(135deg,var(--green),var(--green-dark)); border-radius:20px; padding:24px; margin-bottom:16px; display:flex; flex-direction:column; align-items:center; gap:12px; }
.prof-av { width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.2); border:3px solid white; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.prof-av img { width:100%; height:100%; object-fit:cover; }
.prof-av-ph { font-size:24px; font-weight:900; color:white; }
.prof-name { font-size:20px; font-weight:900; color:white; }
.prof-huid { font-size:11px; color:rgba(255,255,255,0.75); letter-spacing:1px; }

/* ── НАСТРОЙКИ ── */
.set-row { display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border); cursor:pointer; }
.set-row:last-child { border-bottom:none; }
.set-row-left { display:flex; align-items:center; gap:12px; }
.set-row-icon { width:36px; height:36px; background:var(--green-light); border-radius:10px; display:flex; align-items:center; justify-content:center; }
.set-row-icon svg { width:18px; height:18px; fill:var(--green); }
.set-row-text { font-size:15px; font-weight:500; color:var(--text); }
.set-row-arr svg { width:16px; height:16px; fill:var(--text2); }

/* ── ВАКАНСИИ ── */
.job-item { background:var(--white); border-radius:var(--r); padding:16px; margin-bottom:10px; box-shadow:var(--shadow2); }
.job-company { font-size:12px; color:var(--text2); margin-bottom:4px; }
.job-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:8px; }
.job-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
.job-tag { font-size:11px; background:var(--green-light); color:var(--green); padding:3px 8px; border-radius:99px; font-weight:600; }

/* ── КОШЕЛЁК ── */
.wallet-card { background:linear-gradient(135deg,#1a1a2e,#16213e); border-radius:20px; padding:20px; margin-bottom:16px; color:white; }
.wallet-balance-label { font-size:11px; opacity:0.6; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
.wallet-balance { font-size:32px; font-weight:900; }
.wallet-currency { font-size:14px; opacity:0.7; margin-left:4px; }
.wallet-actions { display:flex; gap:10px; margin-top:16px; }
.wallet-btn { flex:1; padding:10px; background:rgba(255,255,255,0.15); border:none; border-radius:10px; color:white; font-size:13px; font-weight:600; font-family:var(--font); cursor:pointer; }

/* ── ПАТЕНТ ── */
.patent-card { background:var(--white); border-radius:20px; padding:20px; border:2px solid var(--green); margin-bottom:16px; }
.patent-title { font-size:16px; font-weight:700; color:var(--text); margin-bottom:4px; }
.patent-id { font-size:11px; color:var(--green); letter-spacing:1px; margin-bottom:12px; }
.patent-field { margin-bottom:10px; }
.patent-field label { font-size:11px; font-weight:600; color:var(--text2); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:4px; }
.patent-field .val { font-size:14px; color:var(--text); font-weight:500; }
.lv-btn { flex:1; border:2px solid var(--border); border-radius:12px; padding:12px 8px; text-align:center; cursor:pointer; background:white; transition:all .15s; }
.lv-btn.on { border-color:var(--green); background:var(--green-light); }
.lv-btn .lv-num { font-weight:900; font-size:16px; color:var(--text2); }
.lv-btn.on .lv-num { color:var(--green); }
.lv-btn .lv-name { font-size:11px; color:var(--text2); }
.lv-btn .lv-price { font-size:13px; font-weight:700; color:var(--text); margin-top:4px; }

/* ── OVERLAY ЧИПА ── */
#chip-overlay {
  display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85);
  z-index:9998; flex-direction:column; align-items:center; justify-content:center; gap:16px;
}
#chip-overlay.on { display:flex; }
.chip-overlay-icon { width:80px; height:80px; border-radius:50%; background:var(--green); display:flex; align-items:center; justify-content:center; }
.chip-overlay-icon svg { width:40px; height:40px; fill:white; }
.chip-overlay-title { color:white; font-size:18px; font-weight:700; font-family:var(--font); }
.chip-overlay-sub { color:rgba(255,255,255,0.7); font-size:14px; font-family:var(--font); text-align:center; padding:0 32px; }
.chip-overlay-bar { width:200px; height:3px; background:var(--green); border-radius:99px; }

/* ── СЕРТИФИКАТ ── */
#cert-page {
  display:none; position:fixed; inset:0; background:white;
  z-index:9999; overflow-y:auto; padding:30px 20px;
}
.cert-wrap { max-width:480px; margin:0 auto; }
.cert-header { text-align:center; border-bottom:2px solid var(--green); padding-bottom:20px; margin-bottom:24px; }
.cert-logo-icon { width:60px; height:60px; background:var(--green); border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }
.cert-logo-icon svg { width:32px; height:32px; fill:white; }
.cert-title { font-size:22px; font-weight:900; letter-spacing:3px; color:var(--text); }
.cert-subtitle { font-size:11px; color:var(--text2); margin-top:4px; letter-spacing:2px; text-transform:uppercase; }
.cert-field { margin-bottom:16px; }
.cert-field label { font-size:10px; color:var(--text2); text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:4px; }
.cert-field p { font-size:14px; font-weight:600; color:var(--text); line-height:1.5; }
.cert-field p.mono { font-family:monospace; font-size:12px; color:var(--green); }
.cert-qr { text-align:center; margin:24px 0; }
.cert-qr img { width:150px; height:150px; border-radius:12px; border:2px solid var(--border); }
.cert-qr-label { font-size:11px; color:var(--text2); margin-top:6px; }
.cert-footer { background:var(--green-light); border-radius:12px; padding:16px; font-size:12px; color:var(--text2); line-height:1.7; text-align:center; margin-bottom:24px; }
.cert-verified { font-size:14px; font-weight:700; color:var(--green); margin-top:10px; }

/* ── ТОСТ ── */
.toast { position:fixed; top:calc(var(--safe-top) + 16px); left:16px; right:16px; background:var(--text); color:white; padding:14px 16px; border-radius:var(--r); font-size:14px; font-weight:500; z-index:99999; transform:translateY(-20px); opacity:0; transition:all .25s; pointer-events:none; font-family:var(--font); }
.toast.show { transform:translateY(0); opacity:1; }

/* ── ТАБЫ ── */
.tab-content { display:none; }
.tab-content.on { display:block; }
#tab-chat { height:calc(100vh - 120px - var(--safe-bot)); flex-direction:column; }
#tab-chat.on { display:flex; }

/* ── ИНВЕСТИЦИИ ── */
.invest-row { display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border); }
.invest-row:last-child { border-bottom:none; }
.invest-left { display:flex; align-items:center; gap:12px; }
.invest-icon { width:40px; height:40px; border-radius:12px; background:var(--green-light); display:flex; align-items:center; justify-content:center; font-size:18px; }
.invest-name { font-size:14px; font-weight:600; color:var(--text); }
.invest-sub { font-size:12px; color:var(--text2); }
.invest-val { text-align:right; }
.invest-price { font-size:14px; font-weight:700; color:var(--text); }
.invest-change { font-size:12px; color:var(--green); font-weight:600; }
.invest-change.down { color:#EF4444; }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
@media print {
  #cert-page { position:static; }
  .cert-wrap button { display:none; }
}
