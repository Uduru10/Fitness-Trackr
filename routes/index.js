const router = require("express").Router();
// /api/health
router.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

router.use("/users", require("./users"));
router.use("/routines", require("./routines"));
router.use("/ra", require("./routine_activities"));
router.use("/activities", require("./activities"));
module.exports = router;
