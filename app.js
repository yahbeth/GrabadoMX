/* ─────────────────────────────────────
   PRODUCTOS — solo llaveros
───────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, category: 'Llaveros', name: 'Llavero de Madera Personalizado',
    price: 40,
    desc: 'Llavero de madera con acabado natural. Grabado láser de alta resolución con el texto, diseño o imagen que elijas. Ligero, resistente y único.',
  },
  {
    id: 2, category: 'Llaveros', name: 'Pack 5 Llaveros Personalizados',
    price: 180,
    desc: 'Pack de 5 llaveros de madera premium. Ideal para regalos de boda, graduación o eventos corporativos. Cada uno con diseño único.',
  },
  {
    id: 3, category: 'Llaveros', name: 'Pack 10 Llaveros Personalizados',
    price: 340,
    desc: 'Pack de 10 llaveros con grabado láser. El mejor precio por pieza. Perfecto para souvenirs, detalles de boda o regalos de empresa.',
  },
];

let cart = [];


/* ─────────────────────────────────────
   NAV / SCROLL
───────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});

function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const tab = document.querySelector(`.ntab[data-p="${id}"]`);
  if (tab) tab.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'designer') setTimeout(initDesigner, 60);
}


/* ─────────────────────────────────────
   SVG LLAVERO
───────────────────────────────────── */
function svgLlavero(variant = 0) {
  const midColors = ['#b07038', '#9a6030', '#c08040'];
  const m = midColors[variant % midColors.length];
  return `<svg class="pcard-svg" viewBox="0 0 200 165" xmlns="http://www.w3.org/2000/svg" height="125">
    <defs>
      <linearGradient id="wg${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#7a4e22"/>
        <stop offset="50%"  stop-color="${m}"/>
        <stop offset="100%" stop-color="#5a3412"/>
      </linearGradient>
      <linearGradient id="ws${variant}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0)"/>
        <stop offset="40%"  stop-color="rgba(255,255,255,0.28)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
      <filter id="gw${variant}" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="sh${variant}">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.15)"/>
      </filter>
    </defs>
    <circle cx="100" cy="16" r="12" fill="none" stroke="#8a6030" stroke-width="3" filter="url(#sh${variant})"/>
    <circle cx="100" cy="16" r="5.5" fill="none" stroke="#a07840" stroke-width="1.8"/>
    <line x1="100" y1="28" x2="100" y2="38" stroke="#8a6030" stroke-width="2.5"/>
    <rect x="14" y="38" width="172" height="108" rx="18" fill="url(#wg${variant})" stroke="rgba(120,80,30,0.4)" stroke-width="0.8" filter="url(#sh${variant})"/>
    <path d="M18 62 Q100 56 186 62"  fill="none" stroke="rgba(50,25,5,0.3)"  stroke-width="1"/>
    <path d="M18 78 Q100 72 186 78"  fill="none" stroke="rgba(50,25,5,0.22)" stroke-width="1"/>
    <path d="M18 94 Q100 88 186 94"  fill="none" stroke="rgba(50,25,5,0.16)" stroke-width="1"/>
    <path d="M18 110 Q100 104 186 110" fill="none" stroke="rgba(50,25,5,0.11)" stroke-width="1"/>
    <rect x="18" y="42" width="22" height="96" rx="9" fill="url(#ws${variant})" opacity="0.75"/>
    <line x1="34" y1="82" x2="166" y2="82" stroke="#3d5c3f" stroke-width="0.9" opacity="0.65" filter="url(#gw${variant})"/>
    <line x1="40" y1="95" x2="160" y2="95" stroke="#3d5c3f" stroke-width="0.9" opacity="0.4"/>
  </svg>`;
}


/* ─────────────────────────────────────
   CATÁLOGO
───────────────────────────────────── */
function renderProducts(list) {
  const g = document.getElementById('productGrid');
  if (!list.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--dim)"><div style="font-size:3rem;margin-bottom:.5rem">🔍</div><p style="font-size:.84rem;font-weight:600">Sin resultados.</p></div>`;
    return;
  }
  g.innerHTML = list.map((p, i) => `
    <div class="pcard" style="animation-delay:${i * 0.08}s">
      <div class="pcard-visual">${svgLlavero(i)}</div>
      <div class="pcard-body">
        <span class="pcard-cat">${p.category}</span>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-desc">${p.desc}</div>
        <div class="laser-tag">🔥 Grabado láser de precisión</div>
        <div class="pcard-price">$${p.price.toLocaleString('es-MX')} <small>MXN</small></div>
      </div>
      <div class="pcard-actions">
        <button class="btn-add" onclick="quickAdd(${p.id})">+ Agregar</button>
        <button class="btn-design" onclick="openDesigner(${p.id})">🎨 Diseñar</button>
      </div>
    </div>`).join('');
}

function doSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  renderProducts(q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) : PRODUCTS);
}

function quickAdd(id) {
  const p = PRODUCTS.find(x => x.id === id);
  cart.push({ ...p });
  updateCart();
  toast(`✅ ${p.name} añadido al carrito`);
}

function openDesigner(id) {
  goTo('designer');
  setTimeout(initDesigner, 100);
}


/* ─────────────────────────────────────
   CARRITO
───────────────────────────────────── */
function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

document.getElementById('overlay').addEventListener('click', () => {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
});

function updateCart() {
  const el = document.getElementById('cartItems');
  let total = 0;
  if (!cart.length) {
    el.innerHTML = `<div class="cart-empty"><div class="bi">🛒</div><p>Tu carrito está vacío</p></div>`;
  } else {
    el.innerHTML = cart.map((it, i) => `
      <div class="ci">
        <span class="ci-ico">🪵</span>
        <div class="ci-info">
          <div class="ci-name">${it.name}</div>
          <div class="ci-price">$${it.price.toLocaleString('es-MX')} MXN</div>
        </div>
        <button class="ci-rm" onclick="removeItem(${i})">✕</button>
      </div>`).join('');
    cart.forEach(it => total += it.price);
  }
  document.getElementById('total').textContent = `$${total.toLocaleString('es-MX')} MXN`;
  const cc = document.getElementById('cartCount');
  cc.textContent = cart.length;
  if (cart.length) { cc.style.transform = 'scale(1.5)'; setTimeout(() => cc.style.transform = '', 220); }
}

function removeItem(i) { cart.splice(i, 1); updateCart(); }

function checkout() {
  if (!cart.length)                                             { toast('❌ El carrito está vacío'); return; }
  if (!document.getElementById('shipAddr').value.trim())       { toast('⚠️ Ingresa tu dirección'); return; }
  if (!document.getElementById('shipPay').value)               { toast('⚠️ Selecciona un método de pago'); return; }
  toast('🎉 ¡Pedido confirmado! Nos pondremos en contacto.');
  cart = []; updateCart();
  document.getElementById('shipAddr').value = '';
  document.getElementById('shipPay').value  = '';
  setTimeout(toggleCart, 1600);
}


/* ─────────────────────────────────────
   DISEÑADOR — Canvas
───────────────────────────────────── */
let CV = null, cx = null;
let layers = [], selIdx = -1, drag = null;
let designerReady = false;

function initDesigner() {
  if (designerReady) { drawCV(); return; }
  CV = document.getElementById('designCanvas');
  if (!CV) return;
  cx = CV.getContext('2d');
  designerReady = true;

  CV.addEventListener('mousedown',  onDown);
  CV.addEventListener('mousemove',  onMove);
  CV.addEventListener('mouseup',    onUp);
  CV.addEventListener('dblclick',   onDbl);
  CV.addEventListener('touchstart', e => { e.preventDefault(); onDown(e.touches[0]); }, { passive: false });
  CV.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0]); }, { passive: false });
  CV.addEventListener('touchend',   e => { e.preventDefault(); onUp(); }, { passive: false });

  drawCV();
}

function cvXY(e) {
  const r = CV.getBoundingClientRect();
  return { x: (e.clientX - r.left) * (CV.width / r.width), y: (e.clientY - r.top) * (CV.height / r.height) };
}

function onDown(e) {
  const { x, y } = cvXY(e);
  selIdx = -1;
  for (let i = layers.length - 1; i >= 0; i--) {
    if (hit(layers[i], x, y)) { selIdx = i; break; }
  }
  if (selIdx >= 0) {
    drag = { sx: x, sy: y, ox: layers[selIdx].x, oy: layers[selIdx].y };
    syncCtrl();
  }
  drawCV();
}

function onMove(e) {
  if (!drag || selIdx < 0) return;
  const { x, y } = cvXY(e);
  layers[selIdx].x = drag.ox + (x - drag.sx);
  layers[selIdx].y = drag.oy + (y - drag.sy);
  drawCV();
}

function onUp() { drag = null; }

function onDbl(e) {
  const { x, y } = cvXY(e);
  for (let i = layers.length - 1; i >= 0; i--) {
    if (hit(layers[i], x, y) && layers[i].type === 'text') {
      selIdx = i;
      const t = prompt('Editar texto:', layers[i].text);
      if (t !== null) { layers[i].text = t; syncCtrl(); drawCV(); }
      return;
    }
  }
}

function hit(l, x, y) {
  if (l.type === 'text') {
    cx.font = `${l.size}px ${l.font}`;
    const w = cx.measureText(l.text).width;
    return x >= l.x - w/2 - 5 && x <= l.x + w/2 + 5 && y >= l.y - l.size && y <= l.y + 8;
  }
  if (l.type === 'img') return x >= l.x && x <= l.x + l.w && y >= l.y && y <= l.y + l.h;
  return false;
}

function drawCV() {
  if (!CV || !cx) return;
  const W = CV.width, H = CV.height;
  cx.clearRect(0, 0, W, H);

  // Fondo llavero madera — tema claro
  const wg = cx.createLinearGradient(0, 0, W, H);
  wg.addColorStop(0,   '#7a4e22');
  wg.addColorStop(0.5, '#b07038');
  wg.addColorStop(1,   '#5a3412');
  cx.fillStyle = wg;
  cx.beginPath(); cx.roundRect(28, 14, W - 56, H - 28, 22); cx.fill();

  // Veta de madera
  cx.lineWidth = 0.9;
  for (let i = 0; i < 8; i++) {
    const gy = 42 + i * 24;
    cx.strokeStyle = `rgba(40,18,4,${0.28 - i * 0.025})`;
    cx.beginPath(); cx.moveTo(30, gy); cx.quadraticCurveTo(W/2, gy - 7, W - 30, gy); cx.stroke();
  }

  // Borde
  cx.strokeStyle = 'rgba(120,80,30,0.4)'; cx.lineWidth = 1.2;
  cx.beginPath(); cx.roundRect(28, 14, W - 56, H - 28, 22); cx.stroke();

  // Brillo blanco
  const wshine = cx.createLinearGradient(32, 0, 58, 0);
  wshine.addColorStop(0,   'rgba(255,255,255,0)');
  wshine.addColorStop(0.5, 'rgba(255,255,255,0.22)');
  wshine.addColorStop(1,   'rgba(255,255,255,0)');
  cx.fillStyle = wshine;
  cx.beginPath(); cx.roundRect(32, 18, 20, H - 36, 8); cx.fill();

  // Argolla
  cx.strokeStyle = '#8a6030'; cx.lineWidth = 4;
  cx.beginPath(); cx.arc(W/2, 10, 11, 0, Math.PI * 2); cx.stroke();
  cx.strokeStyle = '#f0e8d8'; cx.lineWidth = 2;
  cx.beginPath(); cx.arc(W/2, 10, 5, 0, Math.PI * 2); cx.stroke();
  cx.strokeStyle = '#8a6030'; cx.lineWidth = 2.5;
  cx.beginPath(); cx.moveTo(W/2, 21); cx.lineTo(W/2, 28); cx.stroke();

  // Capas usuario
  layers.forEach((l, i) => {
    const sel = i === selIdx;
    if (l.type === 'text') {
      cx.font = `${l.size}px ${l.font}`;
      cx.textAlign = 'center'; cx.textBaseline = 'alphabetic';
      cx.shadowColor = l.color; cx.shadowBlur = sel ? 18 : 10;
      cx.fillStyle = l.color;
      cx.fillText(l.text, l.x, l.y);
      cx.shadowBlur = 0;
      if (sel) {
        const tw = cx.measureText(l.text).width;
        cx.strokeStyle = 'rgba(255,140,0,0.8)'; cx.lineWidth = 1.5;
        cx.setLineDash([4, 3]);
        cx.strokeRect(l.x - tw/2 - 6, l.y - l.size - 2, tw + 12, l.size + 10);
        cx.setLineDash([]);
      }
    }
    if (l.type === 'img') {
      cx.globalAlpha = l.opacity;
      cx.drawImage(l.img, l.x, l.y, l.w, l.h);
      cx.globalAlpha = 1;
      if (sel) {
        cx.strokeStyle = 'rgba(255,140,0,0.8)'; cx.lineWidth = 1.5;
        cx.setLineDash([4, 3]);
        cx.strokeRect(l.x - 3, l.y - 3, l.w + 6, l.h + 6);
        cx.setLineDash([]);
      }
    }
  });
}

function addText() {
  if (!CV) initDesigner();
  const text  = document.getElementById('d-text').value.trim() || 'Tu grabado';
  const size  = parseInt(document.getElementById('d-size').value) || 28;
  const font  = document.getElementById('d-font').value;
  const color = document.querySelector('.swatch.on')?.dataset.c || '#f2dfc0';
  layers.push({ type: 'text', x: CV.width/2, y: CV.height/2, text, font, size, color });
  selIdx = layers.length - 1;
  syncCtrl(); drawCV();
}

function updateText() {
  if (selIdx < 0 || layers[selIdx].type !== 'text') return;
  layers[selIdx].text = document.getElementById('d-text').value;
  drawCV();
}
function updateFont() {
  if (selIdx < 0 || layers[selIdx].type !== 'text') return;
  layers[selIdx].font = document.getElementById('d-font').value;
  drawCV();
}
function updateSize() {
  const v = document.getElementById('d-size').value;
  document.getElementById('d-size-lbl').textContent = v + 'px';
  if (selIdx < 0 || layers[selIdx].type !== 'text') return;
  layers[selIdx].size = parseInt(v);
  drawCV();
}
function setColor(el) {
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  if (selIdx >= 0 && layers[selIdx].type === 'text') { layers[selIdx].color = el.dataset.c; drawCV(); }
}
function setColorDirect(c) {
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('on'));
  if (selIdx >= 0 && layers[selIdx].type === 'text') { layers[selIdx].color = c; drawCV(); }
}

function loadImage(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const maxW = 180, maxH = 140;
      let w = img.width, h = img.height;
      if (w > maxW) { h = h * maxW / w; w = maxW; }
      if (h > maxH) { w = w * maxH / h; h = maxH; }
      const layer = { type: 'img', img, x: CV.width/2 - w/2, y: CV.height/2 - h/2, w, h, opacity: 0.88, baseW: w, baseH: h };
      layers.push(layer); selIdx = layers.length - 1;
      document.getElementById('imgControls').classList.add('show');
      document.getElementById('img-scale').value = 100;
      document.getElementById('img-scale-lbl').textContent = '100%';
      document.getElementById('img-opacity').value = 88;
      document.getElementById('img-opacity-lbl').textContent = '88%';
      drawCV();
      toast('✅ Imagen añadida — arrástrala para posicionarla');
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function updateImgScale() {
  const pct = parseInt(document.getElementById('img-scale').value);
  document.getElementById('img-scale-lbl').textContent = pct + '%';
  if (selIdx < 0 || layers[selIdx].type !== 'img') return;
  const l = layers[selIdx]; l.w = l.baseW * pct/100; l.h = l.baseH * pct/100; drawCV();
}
function updateImgOpacity() {
  const pct = parseInt(document.getElementById('img-opacity').value);
  document.getElementById('img-opacity-lbl').textContent = pct + '%';
  if (selIdx < 0 || layers[selIdx].type !== 'img') return;
  layers[selIdx].opacity = pct/100; drawCV();
}

function syncCtrl() {
  if (selIdx < 0) return;
  const l = layers[selIdx];
  if (l.type === 'text') {
    document.getElementById('d-text').value = l.text;
    document.getElementById('d-font').value = l.font;
    document.getElementById('d-size').value = l.size;
    document.getElementById('d-size-lbl').textContent = l.size + 'px';
    document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('on', s.dataset.c === l.color));
  }
  if (l.type === 'img') document.getElementById('imgControls').classList.add('show');
}

function mv(dx, dy) { if (selIdx < 0) return; layers[selIdx].x += dx*5; layers[selIdx].y += dy*5; drawCV(); }
function delSel() { if (selIdx < 0) return; layers.splice(selIdx, 1); selIdx = -1; drawCV(); }
function bringFwd() { if (selIdx < 0 || selIdx === layers.length-1) return; [layers[selIdx],layers[selIdx+1]] = [layers[selIdx+1],layers[selIdx]]; selIdx++; drawCV(); }
function sendBack() { if (selIdx <= 0) return; [layers[selIdx],layers[selIdx-1]] = [layers[selIdx-1],layers[selIdx]]; selIdx--; drawCV(); }
function clearCanvas() { if (!layers.length) return; if (confirm('¿Limpiar todo el diseño?')) { layers = []; selIdx = -1; drawCV(); } }

function addDesignToCart() {
  const p = PRODUCTS[0];
  cart.push({ ...p, name: p.name + ' (diseño personalizado)' });
  updateCart();
  toast('🔥 Llavero añadido con tu diseño');
}
function downloadPreview() {
  if (!CV) return;
  const a = document.createElement('a'); a.download = 'x-lasers-preview.png'; a.href = CV.toDataURL('image/png'); a.click();
  toast('⬇ Vista previa descargada');
}


/* ─────────────────────────────────────
   PEDIDO
───────────────────────────────────── */
document.getElementById('or-product').addEventListener('change', updateOrderPreview);
function updateOrderPreview() {
  const t = document.getElementById('or-text').value.trim();
  const p = document.getElementById('or-product').value;
  document.getElementById('pr-txt').textContent = t || 'Tu texto aparecerá aquí…';
  document.getElementById('pr-sub').textContent = p || 'Llavero de madera personalizado';
}
function submitOrder() {
  const name  = document.getElementById('or-name').value.trim();
  const email = document.getElementById('or-email').value.trim();
  const prod  = document.getElementById('or-product').value;
  const qty   = document.getElementById('or-qty').value;
  const text  = document.getElementById('or-text').value.trim();
  if (!name || !email || !prod || !qty || !text) { toast('⚠️ Completa los campos obligatorios (*)'); return; }
  const num = '#XL-' + String(Math.floor(Math.random() * 9000) + 1000);
  document.getElementById('ordNum').textContent = num;
  document.getElementById('ordConfirm').classList.add('show');
  document.getElementById('ordConfirm').scrollIntoView({ behavior: 'smooth', block: 'center' });
  ['or-name','or-email','or-text','or-notes','or-phone'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('or-product').value = '';
  document.getElementById('or-qty').value = '';
  updateOrderPreview();
  toast(`✅ Pedido ${num} enviado`);
}


/* ─────────────────────────────────────
   CONTACTO
───────────────────────────────────── */
function submitContact() {
  const name  = document.getElementById('ct-name').value.trim();
  const email = document.getElementById('ct-email').value.trim();
  const sub   = document.getElementById('ct-subject').value;
  const msg   = document.getElementById('ct-msg').value.trim();
  if (!name || !email || !sub || !msg) { toast('⚠️ Completa todos los campos'); return; }
  toast('📬 ¡Mensaje enviado! Te respondemos pronto.');
  ['ct-name','ct-email','ct-msg'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('ct-subject').value = '';
}


/* ─────────────────────────────────────
   TOAST
───────────────────────────────────── */
let toastTmr;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => el.classList.remove('show'), 2800);
}


/* ─────────────────────────────────────
   AUTENTICACIÓN
───────────────────────────────────── */
const DEMOS = [
  { email: 'admin@xlasers.mx',  pass: 'laser123',  name: 'Admin X-Lasers' },
  { email: 'user@xlasers.mx',   pass: 'madera456', name: 'Cliente Frecuente' },
];
const getUsers   = () => { try { return JSON.parse(localStorage.getItem('xl_users') || '[]'); } catch { return []; } };
const saveUsers  = u  => localStorage.setItem('xl_users', JSON.stringify(u));
const getSession = () => { try { return JSON.parse(sessionStorage.getItem('xl_sess') || 'null'); } catch { return null; } };

function applySession(user) {
  const chip = document.getElementById('userChip');
  const lbtn = document.getElementById('loginBtnNav');
  if (user) {
    document.getElementById('uavatar').textContent = user.name.charAt(0).toUpperCase();
    document.getElementById('uname').textContent   = user.name.split(' ')[0];
    chip.style.display = 'flex'; lbtn.style.display = 'none';
  } else {
    chip.style.display = 'none'; lbtn.style.display = 'flex';
  }
}
function showLogin() {
  const m = document.getElementById('loginModal');
  m.style.display = 'flex'; void m.offsetWidth;
  document.body.style.overflow = 'hidden';
}
function hideLogin() {
  const m = document.getElementById('loginModal');
  m.style.display = 'none';
  document.body.style.overflow = '';
}
function switchTab(t) {
  document.querySelectorAll('.ltab').forEach((b, i) => b.classList.toggle('on', (t==='in') === (i===0)));
  document.getElementById('panelIn').classList.toggle('on', t==='in');
  document.getElementById('panelUp').classList.toggle('on', t!=='in');
  document.getElementById('li-err').classList.remove('on');
  document.getElementById('up-err').classList.remove('on');
}
function fillDemo(e, p) { document.getElementById('li-email').value = e; document.getElementById('li-pass').value = p; }
function showErr(id, msg) { const el = document.getElementById(id); el.textContent = msg; el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
function doLogin() {
  const email = document.getElementById('li-email').value.trim().toLowerCase();
  const pass  = document.getElementById('li-pass').value;
  const user  = [...DEMOS, ...getUsers()].find(u => u.email.toLowerCase() === email && u.pass === pass);
  if (!user) { showErr('li-err', 'Correo o contraseña incorrectos.'); return; }
  sessionStorage.setItem('xl_sess', JSON.stringify({ email: user.email, name: user.name }));
  applySession(user); hideLogin();
  toast(`🔥 Bienvenido/a, ${user.name.split(' ')[0]}!`);
}
function doRegister() {
  const name  = document.getElementById('up-name').value.trim();
  const email = document.getElementById('up-email').value.trim().toLowerCase();
  const pass  = document.getElementById('up-pass').value;
  const pass2 = document.getElementById('up-pass2').value;
  if (!name)                { showErr('up-err', 'Ingresa tu nombre.'); return; }
  if (!email.includes('@')) { showErr('up-err', 'Correo inválido.'); return; }
  if (pass.length < 6)      { showErr('up-err', 'Contraseña mínimo 6 caracteres.'); return; }
  if (pass !== pass2)       { showErr('up-err', 'Las contraseñas no coinciden.'); return; }
  if ([...DEMOS,...getUsers()].find(u => u.email.toLowerCase() === email)) { showErr('up-err', 'Ese correo ya está registrado.'); return; }
  const users = getUsers(); users.push({ email, pass, name }); saveUsers(users);
  sessionStorage.setItem('xl_sess', JSON.stringify({ email, name }));
  applySession({ name }); hideLogin();
  toast(`🎉 ¡Bienvenido/a, ${name.split(' ')[0]}!`);
}
function doLogout() {
  sessionStorage.removeItem('xl_sess'); applySession(null); cart = []; updateCart();
  toast('👋 Sesión cerrada. ¡Hasta pronto!');
}


/* ─────────────────────────────────────
   INIT
───────────────────────────────────── */
(function init() {
  document.getElementById('userChip').style.display = 'none';
  document.getElementById('loginModal').style.display = 'none';
  applySession(getSession());
  renderProducts(PRODUCTS);
  updateCart();
})();
