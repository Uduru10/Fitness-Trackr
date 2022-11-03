const client = require("../client");
const { routines } = require("../seedData");

async function createRoutine(routine) {
  const { creator_id, is_public, name, goal } = routine;
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            INSERT INTO routines(creator_id, is_public, name, goal)
            VALUES ($1,$2,$3,$4)
            RETURNING *;
            `,
      [creator_id, is_public, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName",
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
		ON routines.id = ra.routine_id
	LEFT JOIN activities 
		ON ra.activity_id = activities.id
	JOIN users
		ON routines.creator_id = users.id	
	GROUP BY routines.id, ra.routine_id, users.username
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(routine_id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
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
    if (!routine) {
      throw {
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that routine_id",
      };
    }
    // Multiple Queries cost more money, bad

    // const { rows: activities } = await client.query(
    //   `SELECT activities.*
    // FROM activities
    // JOIN routine_activities ON activities.id=routine_activities.activity_id
    // WHERE routine_activities.routine_id=$1;
    //  `,
    //   [routine_id]
    // );

    // const {
    //   rows: [creator],
    // } = await client.query(
    //   `
    //     SELECT id, username
    //     FROM users
    //     WHERE id=$1;
    //     `,
    //   [routine.creator_id]
    // );

    // routine.activities = activities;
    // routine.creator = creator;

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM routines;
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      `  
      SELECT routines.*, users.username AS "creatorName",
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
          ON routines.id = ra.routine_id
      LEFT JOIN activities 
          ON ra.activity_id = activities.id
      JOIN users
          ON routines.creator_id = users.id	
          WHERE routines.is_public = true
      GROUP BY routines.id, ra.routine_id, users.username

          `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutinesByUser(username) {
  try {
    const { rows } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName",
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
		ON routines.id = ra.routine_id
	LEFT JOIN activities 
		ON ra.activity_id = activities.id
	JOIN users
		ON routines.creator_id = users.id	
    WHERE routines.is_public = true AND users.username=$1
	GROUP BY routines.id, ra.routine_id, users.username
        `,
      [username]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    const { rows } = await client.query(
      `
SELECT routines.*, users.username AS "creatorName",
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
ON routines.id = ra.routine_id
LEFT JOIN activities 
ON ra.activity_id = activities.id
JOIN users
ON routines.creator_id = users.id	
WHERE users.username=$1
GROUP BY routines.id, ra.routine_id, users.username
`,
      [username]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity(activity_id) {
  try {
    const {
      rows: [routine],
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
      WHERE activities.id=$1 AND  routines.is_public = true
      GROUP BY routines.id, ra.routine_id, users.username
`,
      [activity_id]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}
async function updateRoutine(routine_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"= $${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [routine],
    } = await client.query(
      `UPDATE routines
    SET ${setString}
    WHERE id=${routine_id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routine_id) {
  // const setString = Object.keys
  //   .map((key, index) => `"${key}"= $${index + 1}`)
  //   .join(",");
  // if (setString.length === 0) {
  //   return;
  // }
  try {
    await client.query(
      ` DELETE FROM routine_activities 
    WHERE routine_id= ${routine_id}
     
    `
    );
    const { rows } = await client.query(
      `DELETE FROM routines 
    WHERE id=${routine_id}
    RETURNING *;
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
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
};
