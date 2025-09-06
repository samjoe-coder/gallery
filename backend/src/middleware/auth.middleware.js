import { verifyToken } from "../utils/jwt.util";

export const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = await verifyToken(token);

  if (!decoded) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('user', decoded);

  await next();
};
