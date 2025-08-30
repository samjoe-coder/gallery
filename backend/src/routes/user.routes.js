import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/', async (c) => { return c.json({ message: 'GET all users' }); })

userRouter.get('/:id', async (c) => {return c.json({ message: 'GET user details' }); })

userRouter.post('/', async (c) => {return c.json({ message: 'Create new user' }); })

userRouter.put('/:id', async (c) => {return c.json({ message: 'UPDATE user' }); })

userRouter.delete('/:id', async (c) => {return c.json({ message: 'DELETE user' }); })



export default userRouter
