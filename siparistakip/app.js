// Config — giriş şifresi ve site ayarları
const PASSWORD = "profilimikiraliyorum"; // Değiştiriniz
const SESSION_KEY = "pmk_session_ok";
const ORDERS_KEY = "pmk_orders"; // localStorage demo veritabanı

// Gate logic
const gate = document.getElementById("gate");
const gateBtn = document.getElementById("gateBtn");
const gateInput = document.getElementById("gateInput");
const gateError = document.getElementById("gateError");

function showGateIfNeeded(){
  const ok = localStorage.getItem(SESSION_KEY);
  if(!ok){ gate.classList.remove("hidden"); }
}
function tryEnter(){
  if(gateInput.value === PASSWORD){
    localStorage.setItem(SESSION_KEY, "1");
    gate.classList.add("hidden");
  }else{
    gateError.textContent = "Hatalı şifre. Tekrar deneyin.";
  }
}
gateBtn?.addEventListener("click", tryEnter);
gateInput?.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){ tryEnter(); }
});
showGateIfNeeded();

// Footer year
document.getElementById("y").textContent = new Date().getFullYear();

// Payment conditional boxes
const shopierBox = document.getElementById("shopierBox");
const ibanBox = document.getElementById("ibanBox");
document.querySelectorAll('input[name="payment"]').forEach(r => {
  r.addEventListener("change", () => {
    if(r.checked && r.value === "Shopier"){
      shopierBox.classList.remove("hidden");
      ibanBox.classList.add("hidden");
    }
    if(r.checked && r.value === "IBAN"){
      ibanBox.classList.remove("hidden");
      shopierBox.classList.add("hidden");
    }
  });
});

// Minimal order handling (demo, localStorage only)
const form = document.getElementById("orderForm");
const success = document.getElementById("orderSuccess");

function randomId(){
  const d = new Date();
  const y = d.getFullYear();
  const n = Math.floor(Math.random()*9000)+1000;
  return `ORD-${y}-${n}`;
}

function loadOrders(){
  try{
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  }catch(e){ return [] }
}
function saveOrders(arr){
  localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const order = Object.fromEntries(data.entries());
  // Basic photo filename if uploaded (for preview only)
  const file = data.get("photo");
  if(file && file.name){ order.photoFileName = file.name; }
  order.id = randomId();
  order.status = "Alındı"; // default
  order.createdAt = new Date().toISOString();

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  form.reset();
  success.classList.remove("hidden");
  success.innerHTML = `✅ Siparişiniz alındı. <strong>Sipariş ID:</strong> ${order.id}<br><small>Bu ID ile aşağıdaki "Sipariş Takip" bölümünden durumunuzu görüntüleyebilirsiniz.</small>`;
  setTimeout(()=> success.classList.add("hidden"), 12000);
});

// Tracking
const trackForm = document.getElementById("trackForm");
const trackResult = document.getElementById("trackResult");

trackForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = (document.getElementById("trackId").value || "").trim();
  const orders = loadOrders();
  const found = orders.find(o => o.id === id);
  if(!found){
    trackResult.innerHTML = `<div class="card">⛔ Kayıt bulunamadı. ID'yi kontrol edip tekrar deneyin.</div>`;
    return;
  }
  const lines = [
    `<div class="card">`,
    `<h3>Sipariş Bilgisi</h3>`,
    `<div class="prices">`,
    `<div class="price-item"><span>ID</span><strong>${found.id}</strong></div>`,
    `<div class="price-item"><span>Durum</span><strong>${found.status}</strong></div>`,
    `<div class="price-item"><span>Hizmet</span><strong>${found.service || "-"}</strong></div>`,
    `</div>`,
    `<p><strong>Metin:</strong> ${found.script || "-"}</p>`,
    found.photoUrl ? `<p><strong>Fotoğraf Linki:</strong> <a href="${found.photoUrl}" target="_blank" rel="noopener">${found.photoUrl}</a></p>` : "",
    found.photoFileName ? `<p><strong>Yüklenen Dosya:</strong> ${found.photoFileName}</p>` : "",
    `<p><small>Oluşturulma: ${new Date(found.createdAt).toLocaleString()}</small></p>`,
    `</div>`
  ].join("");
  trackResult.innerHTML = lines;
});

// Small UX touches
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-ripple]");
  if(!el) return;
  el.classList.add("ripple");
  setTimeout(()=> el.classList.remove("ripple"), 300);
});
