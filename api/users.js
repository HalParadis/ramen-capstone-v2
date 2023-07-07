const express = require("express");
const {
  getUserByUsername,
  getUserById,
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
      next({
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

router.get('/:userId', async (req, res, next) => {  // <------ in progress
  try {
    const { userId } = req.params;

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
      res.status(401);
      next({
        error: 'InvalidTokenError',
        message: "You must be logged in to perform this action"
      });
    } 
    else {
      const token = auth.slice(prefix.length);
      const { id: tokenId } = jwt.verify(token, JWT_SECRET);

      if (tokenId) {
        const tokenUser = await getUserById(tokenId);

        if (tokenUser.isAdmin || tokenId == userId) {
          const selectedUser = await getUserById(userId);
          res.send(selectedUser);
        }
        else {
          next({
            error: 'UnauthorizedRequestError',
            message: 'You are not authorized to view this data'
          })
        }
      }
    }
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;
