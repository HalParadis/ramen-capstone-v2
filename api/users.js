const express = require("express");
const {
  getUserByUsername,
  getUserById,
  createUser,
  getUserByUsernameAndPassword,
  getAllUsers,
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

router.get("/", async (req, res, next ) =>{
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch(error){
    console.error(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 

    if (id) {
      const user = await getUserById(id);
      res.send(user);
    } 
    else {
      next({
        name: 'NoUserIdError',
        message: `No user exist with id ${id}`
      });
    }
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
