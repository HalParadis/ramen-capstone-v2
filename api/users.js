const express = require("express");
const {
  getUserByUsername,
  createUser,
  getUserByUsernameAndPassword,
} = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, address } = req.body;
    const _user = await getUserByUsername(username);
    if (_user) {
      res.send({
        error: "UserExistError",
        message: `Username ${username} already exists`,
      });
    }
    const user = await createUser({ username, password, email, address });
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, token });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
