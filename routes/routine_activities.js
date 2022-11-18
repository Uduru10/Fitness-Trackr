const raRouter = require("express").Router();
const { RA, Routine } = require("../db/adapters");
const { updateRoutineActivity } = require("../db/adapters/routine_activities");
const { authRequired } = require("./utils");

raRouter.post("/", async (req, res, next) => {
  const { routine_id, activity_id, duration, count } = req.body;
  try {
    const raData = { routine_id, activity_id, duration, count };
    const ra = await RA.addActivityToRoutine(raData);
    if (ra) {
      res.send(ra);
    } else {
      res.status(400);
      next({ message: "Error creating routine_activities" });
    }
  } catch (error) {
    next(error);
  }
});

raRouter.get("/", async (req, res, next) => {
  try {
    const allRA = await RA.getAllRA();
    res.send(allRA);
  } catch (error) {
    next(error);
  }
});

raRouter.get("/:routineActivityId", async (req, res, next) => {
  const { routineActivityId } = req.params;
  try {
    const singleRA = await RA.getRoutineActivityById(routineActivityId);
    res.send(singleRA);
  } catch (error) {
    next(error);
  }
});
raRouter.patch("/:routineId/:activityId", async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId } = req.params;
  const { count, duration } = req.body;

  const updateFields = {};

  if (count) {
    updateFields.count = count;
  }
  if (duration) {
    updateFields.duration = duration;
  }

  try {
    const updatedRA = updateRoutineActivity(
      routineId,
      activityId,
      updateFields.count,
      updateFields.duration
    );
    res.send({ updatedRA });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

raRouter.delete("/:routineId/:activityId", async (req, res, next) => {
  try {
    const deletedRA = RA.destroyRoutineActivity(
      req.params.routineId,
      req.params.activityId
    );
    res.send(deletedRA);
  } catch (error) {
    next(error);
  }
});

module.exports = raRouter;
