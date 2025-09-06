import { Hono } from 'hono'
import { getUserById, createUser } from '../services/user.service';
import { successResponse, errorResponse } from '../utils/response.util';

const userRouter = new Hono()

userRouter.get('/', async (c) => {
    let users = await getAllUsers(c.env.DB);
    return c.json({ message: 'GET all users', data: users });
})

userRouter.get("/id/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const user = await getUserById(c.env.DB, userId);

    return c.json(successResponse("User details fetched successfully", user));

  } catch (err) {
    return c.json(
      errorResponse("Failed to fetch user", { details: err.message })
    );
  }
});

userRouter.get("/email/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const user = await getUserById(c.env.DB, email);

    return c.json(successResponse("User details fetched successfully", user));

  } catch (err) {
    return c.json(
      errorResponse("Failed to fetch user", { details: err.message })
    );
  }
});


userRouter.post("/", async (c) => {
  try {
    const userData = await c.req.json();

    const user = await createUser(c.env.DB, {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      avatar_url: userData.avatar_url
    });

    return c.json(successResponse("User created successfully", user));

  } catch (err) {
    return c.json(errorResponse("Failed to create user", { details: err.message }));
  }
});

userRouter.put('/:id', async (c) => {
    let userId = c.req.param('id');
    let userData = await c.req.json();

    let results = await updateUser(c.env.DB, userId, {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        avatar_url: userData.avatar_url
    });

    return c.json({ message: 'Update user', data: results });

})

userRouter.put('/:id', async (c) => {return c.json({ message: 'UPDATE user' }); })

userRouter.delete('/:id', async (c) => {return c.json({ message: 'DELETE user' }); })


export default userRouter
