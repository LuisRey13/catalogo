/* ============ Tokens ============ */
:root{
  --cream: #FBF3E4;
  --ivory-2: #F6E8C8;
  --gold: #E8B923;
  --gold-deep: #C4930E;
  --gold-pale: #F3D677;
  --ink: #3B2A16;
  --ink-soft: #7A6544;
  --white: #FFFDF8;
  --radius-lg: 26px;
  --radius-md: 16px;
  --radius-sm: 10px;
  --shadow-soft: 0 18px 40px -12px rgba(90, 62, 12, 0.28);
  --shadow-pop: 0 10px 24px -8px rgba(90, 62, 12, 0.35);
  --font-display: 'Yellowtail', cursive;
  --font-body: 'Poppins', sans-serif;
  --font-num: 'Nunito', sans-serif;
}

*{ box-sizing: border-box; }
html,body{ height:100%; }
body{
  margin:0;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  overflow-x:hidden;
  min-height:100vh;
}

/* ============ Fondo decorativo ============ */
.bg-deco{
  position:fixed; inset:0;
  z-index:0;
  pointer-events:none;
  overflow:hidden;
  color: var(--gold);
}
.bg-deco .blob{
  position:absolute;
  opacity:0.16;
}
.bg-deco .blob-a{ width:520px; height:520px; top:-140px; left:-160px; }
.bg-deco .blob-b{ width:460px; height:460px; bottom:-160px; right:-140px; color: var(--gold-pale); opacity:0.22; }
.bg-deco .ring{
  position:absolute;
  width:260px; height:260px;
  top:12%; right:6%;
  opacity:0.14;
}
.bg-deco .dots{ position:absolute; width:180px; height:180px; opacity:0.35; }
.bg-deco .dots-a{ bottom:8%; left:4%; background-image: radial-gradient(currentColor 3px, transparent 3.5px); background-size: 22px 22px; color: var(--gold-deep); opacity:0.18;}
.bg-deco .dots-b{ top:6%; left:38%; background-image: radial-gradient(currentColor 3px, transparent 3.5px); background-size: 18px 18px; color: var(--gold); opacity:0.14;}

/* ============ Barra superior ============ */
.topbar{
  position:relative; z-index:5;
  display:flex; align-items:center; justify-content:space-between;
  padding: 18px clamp(16px, 4vw, 48px);
}
.brand{ display:flex; align-items:center; gap:10px; }
.brand-mark{ font-size:26px; }
.brand-name{
  font-family: var(--font-display);
  font-size: 34px;
  color: var(--ink);
  line-height:1;
}
.btn-search{
  display:flex; align-items:center; gap:8px;
  background: var(--white);
  border: 1.5px solid var(--gold-pale);
  color: var(--ink);
  padding: 10px 18px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight:600;
  font-size: 14px;
  cursor:pointer;
  box-shadow: var(--shadow-pop);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.btn-search:hover{ transform: translateY(-1px); background: var(--gold-pale); }
.btn-search svg{ color: var(--gold-deep); }

/* ============ Escenario ============ */
.stage{
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center;
  gap: 22px;
  padding: 18px 16px 48px;
  min-height: calc(100vh - 90px);
  justify-content:center;
}
.book-row{
  display:flex; align-items:center; justify-content:center;
  gap: clamp(8px, 2.4vw, 28px);
  width:100%;
}

.nav-arrow{
  flex: 0 0 auto;
  width:48px; height:48px;
  border-radius:50%;
  border: none;
  background: var(--white);
  color: var(--gold-deep);
  box-shadow: var(--shadow-pop);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  transition: transform .15s ease, background .15s ease;
}
.nav-arrow:hover{ transform: scale(1.07); background: var(--gold-pale); }
.nav-arrow:active{ transform: scale(0.96); }
.nav-arrow:disabled{ opacity:0.35; cursor:default; transform:none; background:var(--white); }

.book-stage{
  position:relative;
  perspective: 2200px;
  width: min(64vw, 78vh * 0.7072);
  max-width: 620px;
}
.book{
  position:relative;
  width:100%;
  aspect-ratio: var(--ar, 0.7072);
  transform-style: preserve-3d;
  border-radius: var(--radius-lg);
  background: var(--white);
  box-shadow: var(--shadow-soft);
  transition: transform .18s ease, opacity .18s ease;
}
.book.jumping{ transform: scale(0.965); opacity: 0.35; }

.page{
  position:absolute; inset:0;
  border-radius: var(--radius-lg);
  overflow:hidden;
  background: var(--white);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform-origin: left center;
  transform: rotateY(0deg);
  transition: transform .85s cubic-bezier(.645,.045,.355,1);
  box-shadow: 2px 0 10px rgba(90,62,12,0.08);
}
.page.no-anim{ transition: none !important; }
.page canvas{
  display:block;
  width:100%; height:100%;
}
.page .shade{
  position:absolute; inset:0;
  pointer-events:none;
  opacity:0;
  background: linear-gradient(90deg, rgba(59,42,22,0.35) 0%, rgba(59,42,22,0.06) 35%, transparent 60%);
}
.page.flipping .shade{ animation: shadeSweep 0.85s ease; }
@keyframes shadeSweep{
  0%{ opacity:0; }
  40%{ opacity:.6; }
  100%{ opacity:0; }
}

.click-zone{
  position:absolute; top:0; bottom:0; width:50%;
  cursor:pointer;
  z-index:40;
}
.click-zone-left{ left:0; }
.click-zone-right{ right:0; }

.book-loading, .book-error{
  position:absolute; inset:0;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:14px;
  background: var(--white);
  border-radius: var(--radius-lg);
  z-index: 60;
  padding: 24px;
  text-align:center;
  overflow-y:auto;
}
.spinner{
  width:38px; height:38px;
  border-radius:50%;
  border: 4px solid var(--ivory-2);
  border-top-color: var(--gold);
  animation: spin .9s linear infinite;
}
@keyframes spin{ to{ transform: rotate(360deg); } }
#loadingText{ color: var(--ink-soft); font-size:14px; margin:0; }
.book-error-title{ font-weight:700; font-size:16px; margin:0; }
.book-error p{ color: var(--ink-soft); font-size:13.5px; line-height:1.5; max-width: 320px; }
.book-error code{
  display:inline-block; margin-top:6px;
  background: var(--ivory-2); padding: 4px 10px; border-radius: 8px;
  font-size:12.5px;
}
.book-error-detail-label{
  display:block; margin-top:4px;
  font-weight:700; font-size:11.5px; text-transform:uppercase; letter-spacing:.03em;
  color: var(--ink-soft);
}
.book-error-detail{
  max-width: 320px;
  max-height: 160px;
  overflow:auto;
  text-align:left;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--ivory-2);
  color: var(--ink);
  padding: 10px 12px;
  border-radius: 10px;
  font-family: 'Courier New', monospace;
  font-size: 11.5px;
  line-height:1.5;
  margin: 6px 0 0;
}

/* ============ Barra píldora ============ */
.pillbar{
  display:flex; align-items:center; gap:10px;
  background: var(--white);
  border-radius: 999px;
  padding: 8px 10px;
  box-shadow: var(--shadow-pop);
}
.pill-btn{
  width:34px; height:34px; border-radius:50%;
  border:none; background: var(--ivory-2); color: var(--gold-deep);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  transition: background .15s ease, transform .15s ease;
}
.pill-btn:hover{ background: var(--gold-pale); }
.pill-btn:disabled{ opacity:.35; cursor:default; }
.pill-page{
  display:flex; align-items:center; gap:6px;
  font-family: var(--font-num);
  font-weight:700;
  font-size:14px;
  color: var(--ink);
}
.pill-page input{
  width:46px;
  text-align:center;
  border: 1.5px solid var(--ivory-2);
  border-radius: 999px;
  padding: 6px 4px;
  font-family: var(--font-num);
  font-weight:700;
  font-size:14px;
  color: var(--ink);
  background: var(--cream);
}
.pill-page input:focus{ outline: 2px solid var(--gold); border-color: var(--gold); }
.pill-of{ color: var(--ink-soft); font-weight:600; }

/* ============ Drawer ============ */
.drawer-overlay{
  position:fixed; inset:0;
  background: rgba(59,42,22,0.42);
  opacity:0; pointer-events:none;
  transition: opacity .25s ease;
  z-index: 90;
}
.drawer-overlay.open{ opacity:1; pointer-events:auto; }

.drawer{
  position:fixed; top:0; left:0; bottom:0;
  width: min(420px, 88vw);
  background: var(--cream);
  box-shadow: 24px 0 60px rgba(59,42,22,0.25);
  transform: translateX(-104%);
  transition: transform .32s cubic-bezier(.2,.9,.25,1);
  z-index: 95;
  display:flex; flex-direction:column;
}
.drawer.open{ transform: translateX(0); }

.drawer-head{
  display:flex; align-items:center; justify-content:space-between;
  padding: 20px 22px 12px;
  border-bottom: 1px solid var(--ivory-2);
}
.drawer-head h2{
  font-family: var(--font-display);
  font-size: 28px;
  margin:0;
  color: var(--ink);
}
.drawer-close{
  width:34px; height:34px; border-radius:50%;
  border:none; background: var(--ivory-2); color: var(--ink);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
}
.drawer-close:hover{ background: var(--gold-pale); }

.drawer-body{
  padding: 16px 22px 28px;
  overflow-y:auto;
  flex:1;
  display:flex; flex-direction:column; gap:16px;
}

.field{ display:flex; flex-direction:column; gap:6px; }
.field-label{
  font-size:12.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em;
  color: var(--ink-soft);
}
.field input[type="text"], .field select{
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--ivory-2);
  background: var(--white);
  font-family: var(--font-body);
  font-size: 14.5px;
  color: var(--ink);
}
.field input[type="text"]:focus, .field select:focus{
  outline:none; border-color: var(--gold);
}

.price-inputs{ display:flex; align-items:center; gap:10px; }
.price-input-wrap{
  display:flex; align-items:center; gap:4px;
  background: var(--white);
  border: 1.5px solid var(--ivory-2);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
  flex:1;
}
.price-input-wrap span{ color: var(--ink-soft); font-weight:600; font-size:13.5px; }
.price-input-wrap input{
  border:none; width:100%; background:transparent;
  font-family: var(--font-num); font-weight:700; font-size:14px; color: var(--ink);
}
.price-input-wrap input:focus{ outline:none; }
.price-sep{ color: var(--ink-soft); }

.range-slider{
  position:relative;
  height: 34px;
  margin-top: 4px;
}
.range-track{
  position:absolute; top:50%; left:0; right:0; height:5px;
  transform: translateY(-50%);
  background: var(--ivory-2);
  border-radius:999px;
}
.range-fill{
  position:absolute; top:50%; height:5px;
  transform: translateY(-50%);
  background: var(--gold);
  border-radius:999px;
}
.range-slider input[type="range"]{
  position:absolute; top:0; left:0; width:100%; height:34px;
  margin:0;
  -webkit-appearance:none; appearance:none;
  background:transparent;
  pointer-events:none;
}
.range-slider input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance:none;
  pointer-events:auto;
  width:20px; height:20px;
  border-radius:50%;
  background: var(--white);
  border: 3px solid var(--gold-deep);
  cursor:pointer;
  margin-top: 0;
  box-shadow: var(--shadow-pop);
}
.range-slider input[type="range"]::-moz-range-thumb{
  pointer-events:auto;
  width:20px; height:20px;
  border-radius:50%;
  background: var(--white);
  border: 3px solid var(--gold-deep);
  cursor:pointer;
  box-shadow: var(--shadow-pop);
}
.range-slider input[type="range"]::-webkit-slider-runnable-track{ background:transparent; }
.range-slider input[type="range"]::-moz-range-track{ background:transparent; }

.btn-clear{
  align-self:flex-start;
  background:none;
  border: 1.5px solid var(--ink-soft);
  color: var(--ink-soft);
  padding: 8px 16px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight:600;
  font-size:13px;
  cursor:pointer;
  transition: border-color .15s ease, color .15s ease;
}
.btn-clear:hover{ border-color: var(--ink); color: var(--ink); }

.results-head{
  display:flex; align-items:center; justify-content:space-between;
  font-family: var(--font-num); font-weight:800; font-size:13px;
  color: var(--ink-soft);
  border-top: 1px solid var(--ivory-2);
  padding-top: 12px;
}

.results-list{ display:flex; flex-direction:column; gap:10px; }
.result-card{
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  box-shadow: 0 4px 14px -6px rgba(90,62,12,0.18);
  display:flex; flex-direction:column; gap:6px;
}
.result-card-top{ display:flex; align-items:flex-start; justify-content:space-between; gap:10px; }
.result-name{ font-weight:700; font-size:14.5px; color: var(--ink); line-height:1.3; }
.result-price{ font-family: var(--font-num); font-weight:800; font-size:14px; color: var(--gold-deep); white-space:nowrap; }
.result-meta{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
.result-tag{
  display:inline-block;
  background: var(--ivory-2);
  color: var(--ink-soft);
  font-size:11.5px; font-weight:700;
  padding: 3px 10px;
  border-radius:999px;
}
.result-view{
  background: var(--gold);
  color: var(--ink);
  border:none;
  font-family: var(--font-body);
  font-weight:700;
  font-size:12.5px;
  padding: 7px 12px;
  border-radius:999px;
  cursor:pointer;
  transition: background .15s ease, transform .15s ease;
  white-space:nowrap;
}
.result-view:hover{ background: var(--gold-deep); color: var(--white); transform: translateY(-1px); }

.no-results{
  text-align:center; color: var(--ink-soft); font-size:14px;
  padding: 24px 8px;
}

/* ============ Responsive ============ */
@media (max-width: 720px){
  .topbar{ padding: 14px 14px; }
  .brand-name{ font-size:26px; }
  .btn-search span{ display:none; }
  .btn-search{ padding:10px; }
  .book-stage{ width: min(72vw, 62vh * 0.7072); }
  .nav-arrow{ width:38px; height:38px; }
  .stage{ gap:16px; padding: 10px 8px 32px; }
  .drawer{ width: 100vw; }
}

@media (max-width: 420px){
  .book-stage{ width: min(66vw, 56vh * 0.7072); }
  .pillbar{ gap:6px; padding:6px 8px; }
  .pill-page input{ width:38px; font-size:13px; }
}

/* Respeta reduced motion */
@media (prefers-reduced-motion: reduce){
  .page{ transition-duration: .01ms !important; }
  .page.flipping .shade{ animation: none !important; }
  .book.jumping{ transition: none; }
}
