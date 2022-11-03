const client = require("./client");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");
const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllPublicRoutinesByUser,
  getAllRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require("./adapters/routines");
const { createActivity } = require("./adapters/activities");
const { createRoutineActivities } = require("./adapters/routine_activities");
const {
  users,
  routines,
  activities,
  routine_activities,
} = require("./seedData");

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
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
   `);

  console.log(`...creating routines table`);
  await client.query(
    `
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
    );
      `
  );
  console.log(`...creating activities table`);
  await client.query(
    `
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
    );
      `
  );

  console.log(`...creating routine_activities table`);
  await client.query(`
    CREATE TABLE routine_activities (
      id SERIAL PRIMARY KEY,
      routine_id INTEGER REFERENCES routines(id),
      activity_id INTEGER REFERENCES activities (id),
      duration INTEGER,
      count INTEGER,
      UNIQUE(routine_id, activity_id)
  );
    `);
};
const seedDb = async () => {
  console.log("...seeding users");
  for (const user of users) {
    await createUser(user);
  }
  console.log("...seeding routines");
  for (const routine of routines) {
    await createRoutine(routine);
  }
  console.log("...seeding activities");
  for (const activity of activities) {
    await createActivity(activity);
  }
  console.log("...seeding routine_activities");
  for (const routine_activity of routine_activities) {
    await createRoutineActivities(routine_activity);
  }

  console.log("Calling getRoutineById");
  const legDay = await getRoutineById(1);
  console.log("Result:", legDay);

  console.log("Calling getAllPublicRoutines");
  const publicRoutines = await getAllPublicRoutines();
  console.log("Public Routines:", publicRoutines);

  console.log("Calling getAllPublicRoutinesByUser");
  const publicUsers = await getAllPublicRoutinesByUser("Bada");
  console.log("Public routines by user:", publicUsers);

  console.log("Calling getAllRoutinesByUser");
  const routineByUser = await getAllRoutinesByUser("Bada");
  console.log("Routines by user:", routineByUser);

  console.log("Calling getPublicRoutinesByActivity");
  const publicRoutineActivity = await getPublicRoutinesByActivity(3);
  console.log("getting public routines by activity:", publicRoutineActivity);

  console.log("Calling updateRoutine");
  const updateRoutineResult = await updateRoutine(routines[0].id, {
    name: "updated name",
    goal: "updated goal",
  });
  console.log("updated routine", updateRoutineResult);

  console.log("Calling destroy Routine");
  const destroyRoutineResult = await destroyRoutine(7);
  console.log("destroyed routine", destroyRoutineResult);
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
