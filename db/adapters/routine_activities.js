const client = require("../client");

async function createRoutineActivities(routine_activity) {
  const { routine_id, activity_id, duration, count } = routine_activity;
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        INSERT INTO routine_activities (routine_id, activity_id, duration, count)
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
      [routine_id, activity_id, duration, count]
    );
    return routine_activity;
  } catch (error) {}
}

async function getRoutineActivityById(id) {}

async function addActivityToRoutine() {}
async function updateRoutineActivity() {}

async function destroyRoutineActivity() {}

async function getRoutineActivitiesByRoutine() {}

module.exports = {
  client,
  createRoutineActivities,
};
