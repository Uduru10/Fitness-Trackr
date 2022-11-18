const raRouter = require("express").Router();
const { RA, Routine } = require("../db/adapters");
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

raRouter.get("./:routineActivityId", async (req, res, next) => {
  const { routineActivityId } = req.params;
  try {
    const singleRA = await RA.getRoutineActivityById(routineActivityId);
    res.send(singleRA);
  } catch (error) {
    next(error);
  }
});
raRouter.patch("/:routineActivityId", authRequired, async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { count, duration } = req.body;

  const updateFields = {};

  if (count) {
    updateFields.count = count;
  }
  if (duration) {
    updateFields.duration = duration;
  }

  try {
    const originalRoutine = await Routine.getRoutineById(routineActivityId);
    if (originalRoutine.creator_id === req.user.id) {
      const updatedRA = await RA.updateRoutineActivity(
        routineActivityId,
        updateFields
      );
      res.send({ ra: updatedRA });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine_activity that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// raRouter.delete("/:routineActivityId", authRequired, async (req, res, next) => {
//   try {
//     const { routineActivityId } = req.params;
//     const ra = await RA.getRoutineActivityById(routineActivityId);
//     const routine = await Routine.getRoutineById(ra.routine_id);
//     if (routine.creator_id === req.user.id) {
//       destroyRoutineActivity(routineActivityId);
//       res.send({ Deleted: ra });
//     } else {
//       next(
//         routine
//           ? {
//               name: "UnauthorizedUserError",
//               message:
//                 "You cannot delete a routine_activity which is not yours",
//             }
//           : {
//               name: "Routine_ActivityNotFoundError",
//               message: "That routine_activity does not exist",
//             }
//       );
//     }
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

// raRouter.delete("/:routineActivityId", authRequired, async (req, res, next) => {
//   try {
//     const ra = await RA.getRoutineActivityById(req.params.routineActivityId);

//     if (ra && ra.id === req.user.id) {
//       const destroyRA = await RA.destroyRoutineActivity(ra.id);
//     }
//     res.send(destroyRA);
//   } catch (error) {
//     next(error);
//   }
// });

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
