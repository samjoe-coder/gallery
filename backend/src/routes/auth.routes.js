import { Hono } from 'hono'

const authRoute = new Hono()

authRoute.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    if (username === 'sam' && password === 'password') {
        return c.json({ token: 'abc123' });
    }
    return c.json({ error: 'Unauthorized' }, 401);
});

export default authRoute
