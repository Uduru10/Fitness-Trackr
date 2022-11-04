const client = require("../client");

async function createActivity(activity) {
  const { name, description } = activity;
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities(name, description)
        VALUES ($1,$2)
        RETURNING *;
        `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}
async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `SELECT * FROM activities
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getActivityById(activity_id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      Select * FROM activities
      WHERE id=$1
      `,
      [activity_id]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activity_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"= $${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [activity],
    } = await client.query(
      `UPDATE activities
      SET ${setString}
      WHERE id=${activity_id}
      RETURNING *`,
      Object.values(fields)
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
