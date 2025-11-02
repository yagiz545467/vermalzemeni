// api/logout.js
export default function handler(req, res) {
  const cookie = `pmk_session=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`;
  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ ok: true });
}
