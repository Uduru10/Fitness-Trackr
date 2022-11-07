// Pawan's Example Code, same as users.js
//const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const authRouter = require("express").Router();
// const { User } = require("../db/adapters/index");
// const { authRequired } = require("./utils");
// const SALT_ROUNDS = 10;
// // const { JWT_SECRET } = process.env; //deconstructed secret can also be inserted

// // POST /api/auth/register
// authRouter.post("/register", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     // Call getUserByUsername, and pass it the username from the body above
//     // if that returns a user, then you need to send an error message back
//     // saying that user already exists, if there isn't a user
//     // you can move on to the rest of the logic
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     const user = await User.createUser({ username, password: hashedPassword });

//     delete user.password;

//     const token = jwt.sign(user, process.env.JWT_SECRET);

//     res.cookie("token", token, {
//       sameSite: "strict",
//       httpOnly: true,
//       signed: true,
//     });

//     res.send({ user });
//   } catch (error) {
//     next(error);
//   }
// });

// authRouter.post("/login", async (req, res, next) => {
//   console.log("Made it to login");
//   try {
//     const { username, password } = req.body;
//     console.log({ username, password });
//     const user = await User.getUserByUsername(username);
//     console.log(user);
//     const validPassword = await bcrypt.compare(password, user.password);

//     delete user.password;

//     if (validPassword) {
//       const token = jwt.sign(user, process.env.JWT_SECRET);

//       res.cookie("token", token, {
//         sameSite: "strict",
//         httpOnly: true,
//         signed: true,
//       });

//       delete user.password;

//       res.send({ user });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// authRouter.post("/logout", async (req, res, next) => {
//   try {
//     res.clearCookie("token", {
//       sameSite: "strict",
//       httpOnly: true,
//       signed: true,
//     });
//     res.send({
//       loggedIn: false,
//       message: "Logged Out",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// authRouter.get("/me", authRequired, async (req, res, next) => {
//   try {
//     res.send(req.user);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = authRouter;
