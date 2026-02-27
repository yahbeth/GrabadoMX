/* ─────────────────────────────────────
   DATOS DE PRODUCTOS
───────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, category: 'Termos', name: 'Termo Personalizado',
    price: 150,
    desc: 'Termo de acero inoxidable de doble pared. Mantiene bebidas frías 24 h y calientes 12 h. Graba tu texto, logo o imagen directamente sobre el metal con nuestro láser de alta precisión.',
  },
  {
    id: 2, category: 'Llaveros', name: 'Llavero de Madera Personalizado',
    price: 40,
    desc: 'Llavero de madera con acabado natural. Grabado láser de alta resolución con el texto, diseño o imagen que elijas. Ligero, resistente y único.',
  },
];

let cart = [];
let selProduct = null;


/* ─────────────────────────────────────
   NAVEGACIÓN
───────────────────────────────────── */
function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelector(`.ntab[data-p="${id}"]`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'designer') setTimeout(initDesigner, 60);
}


/* ─────────────────────────────────────
   SVG ILUSTRACIONES
───────────────────────────────────── */
function svgTermo() {
  return `<svg class="pcard-svg" viewBox="0 0 90 150" xmlns="http://www.w3.org/2000/svg" height="140">
    <defs>
      <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#1a0f05"/>
        <stop offset="35%"  stop-color="#3a2410"/>
        <stop offset="65%"  stop-color="#3a2410"/>
        <stop offset="100%" stop-color="#1a0f05"/>
      </linearGradient>
      <linearGradient id="ts" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#f0c060" stop-opacity="0"/>
        <stop offset="50%"  stop-color="#f0c060" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#f0c060" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="18" y="18" width="54" height="120" rx="9" fill="url(#tg)" stroke="#c87941" stroke-width="0.7"/>
    <rect x="22" y="22" width="9" height="108" rx="4.5" fill="url(#ts)"/>
    <rect x="20" y="10" width="50" height="13" rx="4" fill="#2c1c0c" stroke="#c87941" stroke-width="0.6"/>
    <rect x="28" y="6"  width="34" height="9"  rx="3" fill="#1a0f05" stroke="#c87941" stroke-width="0.5"/>
    <ellipse cx="45" cy="75" rx="22" ry="30" fill="rgba(90,55,20,0.25)"/>
    <line x1="30" y1="68" x2="60" y2="68" stroke="#ff8c00" stroke-width="0.55" opacity="0.65"/>
    <line x1="30" y1="73" x2="60" y2="73" stroke="#ff8c00" stroke-width="0.55" opacity="0.4"/>
    <line x1="33" y1="78" x2="57" y2="78" stroke="#ff8c00" stroke-width="0.55" opacity="0.25"/>
    <rect x="20" y="134" width="50" height="6" rx="3" fill="#2c1c0c" stroke="#c87941" stroke-width="0.5"/>
  </svg>`;
}

function svgLlavero() {
  return `<svg class="pcard-svg" viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg" height="110">
    <defs>
      <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#6b3f1a"/>
        <stop offset="50%"  stop-color="#8c5a2a"/>
        <stop offset="100%" stop-color="#4e2e0e"/>
      </linearGradient>
      <linearGradient id="ws" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#f0c060" stop-opacity="0"/>
        <stop offset="40%"  stop-color="#f0c060" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#f0c060" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="65" cy="13" r="10" fill="none" stroke="#c87941" stroke-width="2.8"/>
    <circle cx="65" cy="13" r="5"  fill="none" stroke="#c87941" stroke-width="1.5"/>
    <line x1="65" y1="23" x2="65" y2="34" stroke="#c87941" stroke-width="2"/>
    <rect x="12" y="34" width="106" height="64" rx="12" fill="url(#wg)" stroke="#c87941" stroke-width="0.7"/>
    <path d="M16 53 Q65 48 114 53" fill="none" stroke="rgba(100,55,15,0.35)" stroke-width="0.8"/>
    <path d="M16 62 Q65 57 114 62" fill="none" stroke="rgba(100,55,15,0.28)" stroke-width="0.8"/>
    <path d="M16 71 Q65 66 114 71" fill="none" stroke="rgba(100,55,15,0.2)"  stroke-width="0.8"/>
    <rect x="16" y="38" width="8" height="54" rx="4" fill="url(#ws)"/>
    <line x1="26" y1="58" x2="104" y2="58" stroke="#ff8c00" stroke-width="0.65" opacity="0.65"/>
    <line x1="30" y1="65" x2="100" y2="65" stroke="#ff8c00" stroke-width="0.65" opacity="0.4"/>
  </svg>`;
}


/* ─────────────────────────────────────
   CATÁLOGO
───────────────────────────────────── */
function renderProducts(list) {
  const g = document.getElementById('productGrid');
  if (!list.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-dim)"><div style="font-size:3rem;margin-bottom:.5rem">🔍</div><p style="font-size:.85rem;font-weight:600">Sin resultados.</p></div>`;
    return;
  }
  g.innerHTML = list.map((p, i) => `
    <div class="pcard" style="animation-delay:${i * 0.07}s">
      <div class="pcard-visual">
        ${p.category === 'Termos' ? svgTermo() : svgLlavero()}
      </div>
      <div class="pcard-body">
        <span class="pcard-cat cat-${p.category}">${p.category}</span>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-desc">${p.desc}</div>
        <div class="laser-tag">🔥 Personalizable con grabado láser</div>
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
  cart.push(p);
  updateCart();
  toast(`✅ ${p.name} añadido al carrito`);
}

function openDesigner(id) {
  const p = PRODUCTS.find(x => x.id === id);
  goTo('designer');
  setTimeout(() => setProduct(p.category === 'Termos' ? 'Termo' : 'Llavero'), 100);
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
        <span class="ci-ico">${it.category === 'Termos' ? '🧊' : '🪵'}</span>
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
  if (cart.length) { cc.style.transform = 'scale(1.45)'; setTimeout(() => cc.style.transform = '', 200); }
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
   DISEÑADOR VISUAL — Canvas
───────────────────────────────────── */
let CV = null, cx = null;
let layers   = [];
let selIdx   = -1;
let drag     = null;
let curProd  = 'Termo';
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
  CV.addEventListener('touchend',   e => { e.preventDefault(); onUp(); },               { passive: false });

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
    return x >= l.x - w / 2 - 5 && x <= l.x + w / 2 + 5 && y >= l.y - l.size && y <= l.y + 8;
  }
  if (l.type === 'img') return x >= l.x && x <= l.x + l.w && y >= l.y && y <= l.y + l.h;
  return false;
}

function drawCV() {
  if (!CV || !cx) return;
  const W = CV.width, H = CV.height;
  cx.clearRect(0, 0, W, H);

  if (curProd === 'Termo') {
    const bg = cx.createLinearGradient(0, 0, W, 0);
    bg.addColorStop(0,    '#100800');
    bg.addColorStop(0.18, '#2a1a08');
    bg.addColorStop(0.5,  '#3a2410');
    bg.addColorStop(0.82, '#2a1a08');
    bg.addColorStop(1,    '#100800');
    cx.fillStyle = bg;
    cx.beginPath(); cx.roundRect(30, 8, W - 60, H - 16, 14); cx.fill();
    const shine = cx.createLinearGradient(34, 0, 64, 0);
    shine.addColorStop(0,   'rgba(240,192,96,0)');
    shine.addColorStop(0.5, 'rgba(240,192,96,0.13)');
    shine.addColorStop(1,   'rgba(240,192,96,0)');
    cx.fillStyle = shine;
    cx.beginPath(); cx.roundRect(34, 14, 20, H - 28, 8); cx.fill();
    cx.strokeStyle = 'rgba(200,121,65,0.35)'; cx.lineWidth = 1.5;
    cx.beginPath(); cx.roundRect(30, 8, W - 60, H - 16, 14); cx.stroke();
    cx.fillStyle = '#1e1008';
    cx.beginPath(); cx.roundRect(30, 8, W - 60, 18, [14, 14, 3, 3]); cx.fill();
    cx.strokeStyle = 'rgba(200,121,65,0.4)'; cx.lineWidth = 1;
    cx.beginPath(); cx.roundRect(30, 8, W - 60, 18, [14, 14, 3, 3]); cx.stroke();
    cx.fillStyle = '#1e1008';
    cx.beginPath(); cx.roundRect(30, H - 26, W - 60, 10, [3, 3, 10, 10]); cx.fill();
    const lbl = cx.createRadialGradient(W/2, H/2, 10, W/2, H/2, 160);
    lbl.addColorStop(0, 'rgba(80,48,18,0.35)');
    lbl.addColorStop(1, 'rgba(80,48,18,0)');
    cx.fillStyle = lbl;
    cx.beginPath(); cx.roundRect(32, 28, W - 64, H - 52, 4); cx.fill();

  } else {
    const wg = cx.createLinearGradient(0, 0, W, H);
    wg.addColorStop(0,   '#4e2e0e');
    wg.addColorStop(0.5, '#8c5a2a');
    wg.addColorStop(1,   '#4e2e0e');
    cx.fillStyle = wg;
    cx.beginPath(); cx.roundRect(22, 22, W - 44, H - 44, 18); cx.fill();
    cx.lineWidth = 0.9;
    for (let i = 0; i < 7; i++) {
      const gy = 48 + i * 20;
      cx.strokeStyle = `rgba(80,40,10,${0.3 - i * 0.03})`;
      cx.beginPath(); cx.moveTo(26, gy); cx.quadraticCurveTo(W / 2, gy - 6, W - 26, gy); cx.stroke();
    }
    cx.strokeStyle = 'rgba(200,121,65,0.32)'; cx.lineWidth = 1.5;
    cx.beginPath(); cx.roundRect(22, 22, W - 44, H - 44, 18); cx.stroke();
    const wshine = cx.createLinearGradient(26, 0, 50, 0);
    wshine.addColorStop(0,   'rgba(240,192,96,0)');
    wshine.addColorStop(0.5, 'rgba(240,192,96,0.15)');
    wshine.addColorStop(1,   'rgba(240,192,96,0)');
    cx.fillStyle = wshine;
    cx.beginPath(); cx.roundRect(26, 26, 16, H - 52, 6); cx.fill();
    cx.strokeStyle = '#c87941'; cx.lineWidth = 4;
    cx.beginPath(); cx.arc(W / 2, 14, 11, 0, Math.PI * 2); cx.stroke();
    cx.strokeStyle = '#1a0f05'; cx.lineWidth = 2;
    cx.beginPath(); cx.arc(W / 2, 14, 6,  0, Math.PI * 2); cx.stroke();
    cx.strokeStyle = '#c87941'; cx.lineWidth = 2.5;
    cx.beginPath(); cx.moveTo(W / 2, 25); cx.lineTo(W / 2, 32); cx.stroke();
  }

  layers.forEach((l, i) => {
    const sel = i === selIdx;
    if (l.type === 'text') {
      cx.font = `${l.size}px ${l.font}`;
      cx.textAlign = 'center'; cx.textBaseline = 'alphabetic';
      cx.shadowColor = l.color; cx.shadowBlur = sel ? 16 : 9;
      cx.fillStyle = l.color;
      cx.fillText(l.text, l.x, l.y);
      cx.shadowBlur = 0;
      if (sel) {
        const tw = cx.measureText(l.text).width;
        cx.strokeStyle = 'rgba(255,140,0,0.75)'; cx.lineWidth = 1.5;
        cx.setLineDash([4, 3]);
        cx.strokeRect(l.x - tw / 2 - 6, l.y - l.size - 2, tw + 12, l.size + 10);
        cx.setLineDash([]);
      }
    }
    if (l.type === 'img') {
      cx.globalAlpha = l.opacity;
      cx.drawImage(l.img, l.x, l.y, l.w, l.h);
      cx.globalAlpha = 1;
      if (sel) {
        cx.strokeStyle = 'rgba(255,140,0,0.75)'; cx.lineWidth = 1.5;
        cx.setLineDash([4, 3]);
        cx.strokeRect(l.x - 3, l.y - 3, l.w + 6, l.h + 6);
        cx.setLineDash([]);
      }
    }
  });
}

function addText() {
  const text  = document.getElementById('d-text').value.trim() || 'Tu grabado';
  const size  = parseInt(document.getElementById('d-size').value) || 34;
  const font  = document.getElementById('d-font').value;
  const color = document.querySelector('.swatch.on')?.dataset.c || '#f2dfc0';
  layers.push({ type: 'text', x: CV.width / 2, y: CV.height / 2, text, font, size, color });
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
      const maxW = 200, maxH = 160;
      let w = img.width, h = img.height;
      if (w > maxW) { h = h * maxW / w; w = maxW; }
      if (h > maxH) { w = w * maxH / h; h = maxH; }
      const layer = { type: 'img', img, x: CV.width / 2 - w / 2, y: CV.height / 2 - h / 2, w, h, opacity: 0.88, baseW: w, baseH: h };
      layers.push(layer);
      selIdx = layers.length - 1;
      document.getElementById('imgControls').classList.add('show');
      document.getElementById('img-scale').value   = 100;
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
  const l = layers[selIdx];
  l.w = l.baseW * pct / 100;
  l.h = l.baseH * pct / 100;
  drawCV();
}
function updateImgOpacity() {
  const pct = parseInt(document.getElementById('img-opacity').value);
  document.getElementById('img-opacity-lbl').textContent = pct + '%';
  if (selIdx < 0 || layers[selIdx].type !== 'img') return;
  layers[selIdx].opacity = pct / 100;
  drawCV();
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
  if (l.type === 'img') {
    document.getElementById('imgControls').classList.add('show');
  }
}

function mv(dx, dy) {
  if (selIdx < 0) return;
  layers[selIdx].x += dx * 5; layers[selIdx].y += dy * 5; drawCV();
}
function delSel() {
  if (selIdx < 0) return;
  layers.splice(selIdx, 1); selIdx = -1; drawCV();
}
function bringFwd() {
  if (selIdx < 0 || selIdx === layers.length - 1) return;
  [layers[selIdx], layers[selIdx + 1]] = [layers[selIdx + 1], layers[selIdx]]; selIdx++; drawCV();
}
function sendBack() {
  if (selIdx <= 0) return;
  [layers[selIdx], layers[selIdx - 1]] = [layers[selIdx - 1], layers[selIdx]]; selIdx--; drawCV();
}
function clearCanvas() {
  if (!layers.length) return;
  if (confirm('¿Limpiar todo el diseño?')) { layers = []; selIdx = -1; drawCV(); }
}
function setProduct(p) {
  curProd = p;
  document.getElementById('psw-termo').classList.toggle('active', p === 'Termo');
  document.getElementById('psw-llavero').classList.toggle('active', p === 'Llavero');
  drawCV();
}
function addDesignToCart() {
  const prod = PRODUCTS.find(p => p.category === (curProd === 'Termo' ? 'Termos' : 'Llaveros'));
  if (prod) {
    cart.push({ ...prod, name: prod.name + ' (diseño personalizado)' });
    updateCart();
    toast(`🔥 ${prod.name} añadido con tu diseño`);
  }
}
function downloadPreview() {
  if (!CV) return;
  const a = document.createElement('a');
  a.download = 'grabado-preview.png';
  a.href = CV.toDataURL('image/png');
  a.click();
  toast('⬇ Vista previa descargada');
}


/* ─────────────────────────────────────
   FORMULARIO DE PEDIDO
───────────────────────────────────── */
document.getElementById('or-product').addEventListener('change', updateOrderPreview);

function updateOrderPreview() {
  const t = document.getElementById('or-text').value.trim();
  const p = document.getElementById('or-product').value;
  document.getElementById('pr-txt').textContent = t || 'Tu texto aparecerá aquí…';
  document.getElementById('pr-sub').textContent = p || 'Selecciona un producto arriba';
  document.getElementById('pr-ico').textContent  = p.includes('Llavero') ? '🪵' : p ? '🧊' : '🪵';
}

function submitOrder() {
  const name = document.getElementById('or-name').value.trim();
  const email= document.getElementById('or-email').value.trim();
  const prod = document.getElementById('or-product').value;
  const qty  = document.getElementById('or-qty').value;
  const text = document.getElementById('or-text').value.trim();
  if (!name || !email || !prod || !qty || !text) { toast('⚠️ Completa todos los campos obligatorios (*)'); return; }
  const num = '#GRB-' + String(Math.floor(Math.random() * 9000) + 1000);
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
   FORMULARIO DE CONTACTO
───────────────────────────────────── */
function submitContact() {
  const name = document.getElementById('ct-name').value.trim();
  const email= document.getElementById('ct-email').value.trim();
  const sub  = document.getElementById('ct-subject').value;
  const msg  = document.getElementById('ct-msg').value.trim();
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
  { email: 'admin@grabado.mx', pass: 'laser123',  name: 'Admin GrabadoMX' },
  { email: 'user@grabado.mx',  pass: 'madera456', name: 'Cliente Frecuente' },
];
const getUsers    = () => { try { return JSON.parse(localStorage.getItem('gx_users') || '[]'); } catch { return []; } };
const saveUsers   = u  => localStorage.setItem('gx_users', JSON.stringify(u));
const getSession  = () => { try { return JSON.parse(sessionStorage.getItem('gx_sess') || 'null'); } catch { return null; } };

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
  m.classList.remove('hidden'); document.body.style.overflow = 'hidden';
}
function hideLogin() {
  const m = document.getElementById('loginModal');
  m.classList.add('hidden'); document.body.style.overflow = '';
  setTimeout(() => m.style.display = 'none', 380);
}
function switchTab(t) {
  document.querySelectorAll('.ltab').forEach((b, i) => b.classList.toggle('on', (t === 'in') === (i === 0)));
  document.getElementById('panelIn').classList.toggle('on', t === 'in');
  document.getElementById('panelUp').classList.toggle('on', t !== 'in');
  document.getElementById('li-err').classList.remove('on');
  document.getElementById('up-err').classList.remove('on');
}
function fillDemo(e, p) { document.getElementById('li-email').value = e; document.getElementById('li-pass').value = p; }

function showErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
}

function doLogin() {
  const email = document.getElementById('li-email').value.trim().toLowerCase();
  const pass  = document.getElementById('li-pass').value;
  const user  = [...DEMOS, ...getUsers()].find(u => u.email.toLowerCase() === email && u.pass === pass);
  if (!user) { showErr('li-err', 'Correo o contraseña incorrectos.'); return; }
  sessionStorage.setItem('gx_sess', JSON.stringify({ email: user.email, name: user.name }));
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
  if ([...DEMOS, ...getUsers()].find(u => u.email.toLowerCase() === email)) { showErr('up-err', 'Ese correo ya está registrado.'); return; }
  const users = getUsers(); users.push({ email, pass, name }); saveUsers(users);
  sessionStorage.setItem('gx_sess', JSON.stringify({ email, name }));
  applySession({ name }); hideLogin();
  toast(`🎉 ¡Cuenta creada! Bienvenido/a, ${name.split(' ')[0]}!`);
}

function doLogout() {
  sessionStorage.removeItem('gx_sess'); applySession(null); cart = []; updateCart();
  toast('👋 Sesión cerrada. ¡Hasta pronto!');
}


/* ─────────────────────────────────────
   INICIALIZACIÓN
───────────────────────────────────── */
(function init() {
  document.getElementById('userChip').style.display = 'none';
  document.getElementById('loginModal').style.display = 'none';
  const user = getSession();
  applySession(user);
  renderProducts(PRODUCTS);
  updateCart();
})();
