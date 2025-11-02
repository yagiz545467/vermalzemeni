// api/shifre.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }
  try {
    const { password } = req.body || {};
    if (!password) {
      res.status(400).json({ ok: false, message: 'Şifre gönderilmedi' });
      return;
    }
    const REAL = process.env.PMK_PASSWORD || '';
    const crypto = require('crypto');
    const a = Buffer.from(password);
    const b = Buffer.from(REAL);
    const same = (a.length === b.length) && crypto.timingSafeEqual(a, b);
    if (!same) {
      res.status(401).json({ ok: false, message: 'Hatalı şifre' });
      return;
    }
    const COOKIE = `pmk_session=1; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; Secure; SameSite=Strict`;
    res.setHeader('Set-Cookie', COOKIE);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Sunucu hatası' });
  }
}
