// shifre-client.js
// Giriş akışı: sayfa açılışında check-auth, modali göster/gizle; butonda /api/shifre'ye POST.
async function tryLogin(password, { onSuccess, onError } = {}) {
  try {
    const r = await fetch('/api/shifre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const j = await r.json();
    if (r.ok && j.ok) {
      onSuccess && onSuccess();
      return true;
    } else {
      onError && onError(j.message || 'Giriş başarısız');
      return false;
    }
  } catch (err) {
    onError && onError('Ağ hatası');
    return false;
  }
}
const pwModal = document.getElementById('pwModal');
const pwBtn = document.getElementById('pwBtn');
const pwInput = document.getElementById('pwInput');
const pwErr = document.getElementById('pwErr');

pwBtn?.addEventListener('click', async () => {
  const pw = pwInput.value || '';
  pwErr.textContent = '';
  await tryLogin(pw, {
    onSuccess: () => { pwModal.classList.add('hidden'); location.reload(); },
    onError: (m) => { pwErr.textContent = m; }
  });
});
pwInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') pwBtn?.click(); });

(async function(){
  try {
    const res = await fetch('/api/check-auth');
    const j = await res.json();
    if (!j.ok) pwModal.classList.remove('hidden');
  } catch(e){
    pwModal.classList.remove('hidden');
  }
})();