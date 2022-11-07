const routinesRouter = require("express").Router();
const { authRequired } = require("./utils");
const { Routine } = require("../db/adapters/index");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allPublicRoutines = await Routine.getAllPublicRoutines();
    res.send({ allPublicRoutines });
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  const { is_public, name, goal } = req.body;
  try {
    const routineData = { creator_id: req.user.id, is_public, name, goal };
    const routine = await Routine.createRoutine(routineData);
    if (routine) {
      res.send(routine);
    } else {
      res.status(400);
      next({ message: "Error creating routines" });
    }
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { is_public, name, goal } = req.body;

  const updateFields = {};

  if (is_public) {
    updateFields.is_public = is_public;
  }

  if (name) {
    updateFields.name = name;
  }
  if (goal) {
    updateFields.goal = goal;
  }

  try {
    const originalRoutine = await Routine.getRoutineById(routineId);
    if (originalRoutine.creator_id === req.user.id) {
      const updatedRoutine = await Routine.updateRoutine(
        routineId,
        updateFields
      );
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  try {
    const routine = await Routine.getRoutineById(req.params.routineId);

    if (routine && routine.creator_id === req.user.id) {
      const updatedRoutine = await Routine.updateRoutine(routine.id, {
        is_public: false,
      });
      res.send(updatedRoutine);
    } else {
      next(
        routine
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "RoutineNotFoundError",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
