const client = require("./client");

// Drop Tables
const dropTables = async () => {
  console.log("...dropping tables");
  await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS users;
    `);
};

// Create Tables
const createTables = async () => {
  console.log(`...creating users table`);
  await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
    CREATE TABLE routines(
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
    )
    CREATE TABLE activities(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
    )
    CREATE TABLE routine_activities(
        id SERIAL PRIMARY KEY,
        routine_id INTEGER REFERENCES routine(id),
        activity_id INTEGER REFERENCES activities (id),
        duration INTEGER
        count INTEGER
        UNIQUE(routine_id, activity_id)
    )`);
};

const rebuildDb = async () => {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();
