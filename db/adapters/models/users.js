const client = require("../../client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(user) {
  const { username, password } = user;
  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;`,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUser() {
  try {
    const { rows } = await client.query(`SELECT * FROM users`);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, users.username
       FROM users
      WHERE id=${id}
      `
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
       FROM users
       WHERE users.username=$1`,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  client,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
