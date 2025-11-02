// api/check-auth.js
export default async function handler(req, res) {
  const cookies = req.headers.cookie || '';
  const ok = cookies.split(';').map(c => c.trim()).some(c => c.startsWith('pmk_session='));
  res.status(200).json({ ok: !!ok });
}
