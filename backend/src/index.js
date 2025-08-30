import { Hono } from 'hono';

import authRoute from './routes/auth.routes';
import userRouter from './routes/user.routes';

const app = new Hono();

app.route('/auth', authRoute);
app.route('/users', userRouter);

app.get('/hello', async (c) => {
    return c.json({ message: 'Hello Sam' });
});

export default app;
