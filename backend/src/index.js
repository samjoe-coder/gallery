import { Hono } from 'hono';

const app = new Hono();

app.get('/hello', (c) => {
    return c.json({ message: 'Hello Sam!' });
});

export default app;
