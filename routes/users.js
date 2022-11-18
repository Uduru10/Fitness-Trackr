const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const { User, Routine } = require("../db/adapters/index");

const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;
// const { JWT_SECRET } = process.env; //deconstructed secret can also be inserted

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Call getUserByUsername, and pass it the username from the body above

    const _user = await User.getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await User.createUser({
        username,
        password: hashedPassword,
      });
      console.log(user);
      delete user.password;

      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      res.send({ user });
    }

    // if that returns a user, then you need to send an error message back
    // saying that user already exists, if there isn't a user
    // you can move on to the rest of the logic
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  console.log("Made it to login");
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await User.getUserByUsername(username);
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);

    delete user.password;

    if (validPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;

      res.send({ user });
    } else {
      next({ message: "Wrong username or password. Please try again" });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;
  try {
    const routinesByUser = await Routine.getAllPublicRoutinesByUser(username);
    console.log("routinesbyUser:", routinesByUser);
    res.send({ routinesByUser });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
