import { sign, verify } from 'hono/jwt';

const JWT_SECRET = 'super-secret-key';

export async function generateToken(payload) {
  return await sign(payload, JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    return await verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
