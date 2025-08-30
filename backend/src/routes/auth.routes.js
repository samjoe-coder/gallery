import { Hono } from 'hono'

const authRoute = new Hono()

authRoute.post('/sign-up', async (c) => {
    const { username, password } = await c.req.json();
    if (username === 'sam' && password === 'password') {
        return c.json({ token: 'abc123' });
    }
    return c.json({ error: 'Unauthorized' }, 401);
});

authRoute.post('/sign-in', async (c) => {
    const { username, password } = await c.req.json();
    if (username === 'sam' && password === 'password') {
        return c.json({ token: 'abc123' });
    }
    return c.json({ error: 'Unauthorized' }, 401);
});

authRoute.post('/sign-out', (c) => {
    return c.json({ message: 'Signed out successfully' });
});

export default authRoute
