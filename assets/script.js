// ---------- ICONS ----------
const icons = {
  sofa: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><rect x="6" y="20" width="36" height="14" rx="3"/><rect x="9" y="10" width="30" height="12" rx="3"/><line x1="8" y1="34" x2="8" y2="40"/><line x1="40" y1="34" x2="40" y2="40"/></svg>`,
  bed: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><rect x="6" y="18" width="36" height="10" rx="2"/><rect x="6" y="28" width="36" height="8"/><line x1="8" y1="36" x2="8" y2="42"/><line x1="40" y1="36" x2="40" y2="42"/><path d="M6 18 v-6 a3 3 0 0 1 3-3 h9 a3 3 0 0 1 3 3 v6"/></svg>`,
  table: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><ellipse cx="24" cy="20" rx="16" ry="6"/><line x1="8" y1="20" x2="8" y2="34"/><line x1="40" y1="20" x2="40" y2="34"/><line x1="24" y1="26" x2="24" y2="40"/></svg>`,
  wardrobe: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><rect x="10" y="6" width="28" height="36" rx="2"/><line x1="10" y1="18" x2="38" y2="18"/><line x1="10" y1="30" x2="38" y2="30"/><circle cx="30" cy="12" r="1.4" fill="#FF7A1A"/></svg>`,
  chair: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><path d="M24 6 L36 16 L34 16 L34 40 L14 40 L14 16 L12 16 Z"/><line x1="24" y1="24" x2="24" y2="40"/></svg>`,
  shelf: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><rect x="10" y="8" width="28" height="8"/><rect x="10" y="20" width="28" height="8"/><rect x="10" y="32" width="28" height="8"/></svg>`,
  lamp: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><line x1="24" y1="44" x2="24" y2="20"/><path d="M10 20 L38 20 L30 6 L18 6 Z"/><line x1="16" y1="44" x2="32" y2="44"/></svg>`,
  recliner: `<svg viewBox="0 0 48 48" fill="none" stroke="#FF7A1A" stroke-width="2"><path d="M8 34 L8 14 L20 14 L24 24 L40 24 L40 34 Z"/><line x1="8" y1="34" x2="8" y2="40"/><line x1="40" y1="34" x2="40" y2="40"/><line x1="2" y1="30" x2="8" y2="30"/></svg>`
};

// ---------- PRODUCTS ----------
const products = [
  {id:1, name:"3-Seater Fabric Sofa, Charcoal Grey", icon:"sofa", price:24999, old:39999, rating:4.3, reviews:1284, badge:"Bestseller", meta:"Free assembly"},
  {id:2, name:"Queen Size Bed with Storage, Walnut Finish", icon:"bed", price:18499, old:27999, rating:4.4, reviews:892, badge:"Deal", meta:"No-cost EMI"},
  {id:3, name:"6-Seater Dining Table Set, Sheesham Wood", icon:"table", price:32999, old:45999, rating:4.5, reviews:531, badge:null, meta:"Free delivery"},
  {id:4, name:"3-Door Wardrobe with Mirror", icon:"wardrobe", price:15999, old:22999, rating:4.1, reviews:674, badge:"Deal", meta:"2-yr warranty"},
  {id:5, name:"Ergonomic Mesh Office Chair", icon:"chair", price:6499, old:9999, rating:4.2, reviews:2103, badge:"Bestseller", meta:"Free delivery"},
  {id:6, name:"5-Tier Book Shelf, Industrial Style", icon:"shelf", price:4299, old:6499, rating:4.0, reviews:317, badge:null, meta:"Easy assembly"},
  {id:7, name:"Modern Floor Lamp, Brass & Fabric", icon:"lamp", price:2799, old:3999, rating:4.3, reviews:198, badge:null, meta:"1-yr warranty"},
  {id:8, name:"Single Seater Recliner, Tan Leatherette", icon:"recliner", price:16999, old:24999, rating:4.4, reviews:445, badge:"Deal", meta:"No-cost EMI"},
];

function stars(r){
  const full = Math.floor(r);
  return "★".repeat(full) + "☆".repeat(5-full);
}

function renderProducts(){
  const grid = document.getElementById('prodGrid');
  grid.innerHTML = products.map(p => {
    const off = Math.round((1 - p.price/p.old)*100);
    return `
    <div class="prodcard">
      ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
      <div class="prod-thumb">${icons[p.icon]}</div>
      <div class="prod-title">${p.name}</div>
      <div class="stars">${stars(p.rating)} <span>(${p.reviews})</span></div>
      <div class="price-row">
        <span class="price-now">${p.price.toLocaleString('en-IN')}</span>
        <span class="price-old">₹${p.old.toLocaleString('en-IN')}</span>
        <span class="price-off">${off}% off</span>
      </div>
      <div class="prod-meta">${p.meta}</div>
      <button class="addbtn" onclick="addToCart(${p.id}, this)">Add to Cart</button>
    </div>`;
  }).join("");
}
renderProducts();

// ---------- CART (in-memory, no localStorage) ----------
let cart = [];

function addToCart(id, btn){
  const p = products.find(x => x.id === id);
  const line = cart.find(x => x.id === id);
  if(line){ line.qty++; } else { cart.push({...p, qty:1}); }
  renderCart();
  showToast(`${p.name.split(',')[0]} added to cart`);
  if(btn){
    btn.textContent = "Added ✓";
    btn.classList.add('added');
    setTimeout(()=>{ btn.textContent = "Add to Cart"; btn.classList.remove('added'); }, 1200);
  }
}

function changeQty(id, delta){
  const line = cart.find(x => x.id === id);
  if(!line) return;
  line.qty += delta;
  if(line.qty <= 0) cart = cart.filter(x => x.id !== id);
  renderCart();
}

function removeLine(id){
  cart = cart.filter(x => x.id !== id);
  renderCart();
}

function renderCart(){
  const count = cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById('cartCount').textContent = count;
  const body = document.getElementById('drawerBody');
  if(cart.length === 0){
    body.innerHTML = `<div class="drawer-empty">Your cart is empty.<br>Start adding some furniture!</div>`;
  } else {
    body.innerHTML = cart.map(l => `
      <div class="cart-line">
        <div class="thumb">${icons[l.icon]}</div>
        <div class="cart-line-info">
          <div class="t">${l.name}</div>
          <div class="p">${(l.price*l.qty).toLocaleString('en-IN')}</div>
          <div class="qty-row">
            <button onclick="changeQty(${l.id},-1)">−</button>
            <span>${l.qty}</span>
            <button onclick="changeQty(${l.id},1)">+</button>
            <button class="rm" onclick="removeLine(${l.id})">Remove</button>
          </div>
        </div>
      </div>`).join("");
  }
  const total = cart.reduce((s,x)=>s + x.price*x.qty, 0);
  document.getElementById('cartTotal').textContent = total.toLocaleString('en-IN');
}
renderCart();

function toggleCart(open){
  document.getElementById('drawer').classList.toggle('open', open);
  document.getElementById('overlay').classList.toggle('open', open);
}

function checkout(){
  if(cart.length === 0){ showToast("Your cart is empty"); return; }
  showToast("This is a demo — checkout isn't connected to real payments.");
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> t.classList.remove('show'), 2200);
}

// ---------- COUNTDOWN TIMER ----------
let totalSeconds = 5*3600 + 42*60 + 10;
setInterval(()=>{
  totalSeconds = Math.max(0, totalSeconds - 1);
  const h = Math.floor(totalSeconds/3600);
  const m = Math.floor((totalSeconds%3600)/60);
  const s = totalSeconds%60;
  document.getElementById('hh').textContent = String(h).padStart(2,'0');
  document.getElementById('mm').textContent = String(m).padStart(2,'0');
  document.getElementById('ss').textContent = String(s).padStart(2,'0');
}, 1000);
