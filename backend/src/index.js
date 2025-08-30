import { Hono } from 'hono';

import authRoute from './routes/auth.routes';

const app = new Hono();

app.route('/auth', authRoute);

app.get('/hello', async (c) => {
    return c.json({ message: 'Hello Sam' });
});

export default app;
