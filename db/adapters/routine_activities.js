const client = require("../client");
async function addActivityToRoutine(routine_activity) {
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
  } catch (error) {
    throw error;
  }
}

async function getAllRA() {
  try {
    const { rows } = await client.query(
      `SELECT * FROM routine_activities
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT * FROM routine_activities
      WHERE id=$1
      `,
      [id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"= $${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `UPDATE routine_activities
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
      Object.values(fields)
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id= ${id}
      RETURNING *;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine(routine_id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra.routine_id is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
          JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'count', ra.count,
          'duration', ra.duration
          )
      ) END AS activities
      FROM routines
      LEFT JOIN routine_activities AS ra 
      ON routines.id=ra.routine_id
      LEFT JOIN activities
      ON activities.id=ra.activity_id
      JOIN users
      ON routines.creator_id=users.id
      WHERE routines.id=$1
      GROUP BY routines.id, ra.routine_id, users.username
`,
      [routine_id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  addActivityToRoutine,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
  getAllRA,
};
