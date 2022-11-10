const activitiesRouter = require("express").Router();
const { Activity, Routine } = require("../db/adapters");

const { authRequired } = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await Activity.getAllActivities();
    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const activityData = { name, description };
    const activity = await Activity.createActivity(activityData);
    if (activity) {
      res.send(activity);
    } else {
      res.status(400);
      next({ message: "Error creating activities" });
    }
  } catch (error) {
    next(error);
  }
});

activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }

  try {
    const originalActivity = await Activity.getActivityById(activityId);
    if (originalActivity.id) {
      const updatedActivity = await Activity.updateActivity(
        activityId,
        updateFields
      );
      res.send({ activity: updatedActivity });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update an activity without logging in",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const routinesByActivity = await Routine.getPublicRoutinesByActivity(
      activityId
    );
    res.send(routinesByActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
