import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/', async (c) => {
    let { results } = await c.env.DB.prepare(
        "SELECT * FROM users",
      ).run();
    return c.json({ message: 'GET all users', data: results });
})

userRouter.get('/:id', async (c) => {return c.json({ message: 'GET user details' }); })

userRouter.post('/', async (c) => {

    let { results } = await c.env.DB.prepare(
        `INSERT INTO users (id, email, password, username, avatar_url)
 VALUES ('random-uuid', 'alice@example.com', 'securepass', 'alice', 'https://example.com/alice.png');`
    ).run();

    return c.json({ message: 'Create new user' , data : results});

})

userRouter.put('/:id', async (c) => {return c.json({ message: 'UPDATE user' }); })

userRouter.delete('/:id', async (c) => {return c.json({ message: 'DELETE user' }); })



export default userRouter
