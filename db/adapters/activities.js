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

module.exports = {
  client,
  createActivity,
  getAllActivities,
};
