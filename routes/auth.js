const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = require("express").Router();
const { User } = require("../db/adapters/models");
const { JWT_SECRET } = process.env;
