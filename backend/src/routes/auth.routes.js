import { Hono } from 'hono'
import { generateToken } from '../utils/jwt.util';
import { getUserByEmail, createUser } from '../services/user.service';
import { errorResponse, successResponse } from '../utils/response.util';
import { verifyPassword } from '../utils/password.util';


const authRoute = new Hono()

authRoute.post("/sign-in", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const user = await getUserByEmail(c.env.DB, email);
    console.log(JSON.stringify(user));

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return c.json(errorResponse("Invalid email or password"), 401);
    }

    const token = await generateToken({
      id: user.id,
      email: user.email
    });

    return c.json(
      successResponse("Signed in successfully", {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar_url: user.avatar_url,
        },
      })
    );
  } catch (err) {
    return c.json(errorResponse("Sign-in failed", { details: err.message }), 401);
  }
});

authRoute.post("/sign-up", async (c) => {
  try {
    const { email, password, username, avatar_url } = await c.req.json();

    const newUser = await createUser(c.env.DB, {
      email,
      username,
      password,
      avatar_url,
    });

    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      role: "user",
    });

    return c.json(
      successResponse("User created successfully", {
        token,
        user: newUser,
      })
    );
  } catch (err) {
    return c.json(errorResponse("Sign-up failed", { details: err.message }), 400);
  }
});

export default authRoute
