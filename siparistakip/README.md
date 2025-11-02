# profilimikiraliyorum — Sipariş Takip (Static Demo)

Bu proje, **Vercel** üzerinde statik olarak barındırabileceğiniz, şifreli girişe sahip,
siyah-kırmızı gradyan temalı bir **Sipariş Formu + Takip** mini sitesidir.

> Not: Bu repo yalnızca **frontend (demo)** işlevi sunar. Gerçek sipariş/takip için bir veritabanı
ve/veya serverless fonksiyon eklenmesi gerekir.

## Özellikler
- Girişte **şifre** (client-side)
- Siyah-kırmızı **animasyonlu gradyan** arka plan
- **Hizmet & fiyat** listesi
- **Sipariş formu** (Shopier/IBAN seçimi)
- **Sipariş takip** (localStorage üzerinde demo)
- Türkçe içerik, mobil uyumlu

## Kurulum
```bash
# Repository'i klonlayın
git clone <repo-url>
cd <repo>

# Gerek yok ama isterseniz yerel sunucuda test:
# (örnek) python -m http.server 8000
```

## Vercel Dağıtım
1. Bu klasörü GitHub'a push edin.
2. [Vercel](https://vercel.com) üzerinden **New Project** → GitHub reposunu seçin.
3. Build ayarlarında **Framework Preset: Other** (veya “Static”) seçin.
4. Output dizini olarak proje kökünü kullanın (index.html kökte).
5. Deploy!

## Şifre Değiştirme
`app.js` içindeki:
```js
const PASSWORD = "profilimikiraliyorum";
```
satırını istediğiniz şifreyle değiştirin.

## Uyarılar
- Şifreleme tamamen **client-side** olduğu için yüksek güvenlik gerektiren alanlarda kullanılmamalıdır.
- “Fotoğraf Yükle” alanı dosyayı **sunucuya göndermez**; demo amaçlıdır.
- Gerçek takip için Vercel **Serverless Function** veya bir **Backend API** ile entegre ediniz.
