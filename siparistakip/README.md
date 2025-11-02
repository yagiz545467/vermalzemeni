# profilimikiraliyorum — Admin (Güvenli Giriş + IBAN)
Bu paket Vercel üzerinde direkt yayınlanabilir. Admin girişi **serverless API** ile yapılır; şifre **client'ta tutulmaz**.

## Kurulum
1. Bu klasörü bir GitHub reposuna yükleyin.
2. Vercel → Project Settings → Environment Variables → `PMK_PASSWORD` değişkenini ekleyin (şifreniz).
3. Deploy edin.

## Dosyalar
- `index.html` — Tüm UI (CSS inline). IBAN metnini dosya içinde düzenleyin.
- `shifre-client.js` — Giriş modalını `/api/shifre` ile bağlar, `/api/check-auth` ile kontrol eder.
- `api/shifre.js` — POST ile şifre doğrular; doğruysa httpOnly cookie atar.
- `api/check-auth.js` — oturum kontrol.
- `api/logout.js` — çıkış.

## Notlar
- IBAN bilgisi `index.html` içinde: `IBAN_TEXT`, `IBAN_NAME` sabitlerini değiştirin.
- Siparişler tarayıcı `localStorage`'da saklanır (demo). Sunucu bağlamak istersen Vercel KV/Serverless ekleyebilirsin.
