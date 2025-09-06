import { hashPassword } from "../utils/hash.util";

export async function getUserByEmail(db, email) {
  try {
    const result = await db
      .prepare(
        `SELECT id, email, username, avatar_url
         FROM users
         WHERE email = ?`
      )
      .bind(email)
      .first();
    if (!result) {
      throw new Error("User not found");
    }

    return result;

  } catch (err) {
    throw new Error(err.message || "Database error");
  }
}

export async function getUserById(db, id) {
  try {
    const result = await db
      .prepare(
        `SELECT id, email, username, avatar_url
         FROM users
         WHERE id = ?`
      )
      .bind(id)
      .first();
    if (!result) {
      throw new Error("User not found");
    }

    return result;

  } catch (err) {
    throw new Error(err.message || "Database error");
  }
}

export async function createUser(db, userData) {
  try {
    const result = await db.prepare(
      `INSERT INTO users (id, email, password, username, avatar_url) VALUES (?, ?, ?, ?, ?) RETURNING id, email, username, avatar_url`
    )
    .bind(
      crypto.randomUUID(),
      userData.email,
      await hashPassword(userData.password),
      userData.username,
      userData.avatar_url
    )
    .first();

    if (!result) {
      throw new Error("Failed to insert user");
    }

    return result;

  } catch (err) {
    throw new Error(err.message || "Database error");
  }
}
