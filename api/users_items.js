const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {
  getUsersItemsByUserId,
  updateUserItemCount,
  deleteUserItem,
  getUserById,
  createUserItem,
  getUserItemByUserItemId
} = require('../db/models');


router.post('/:ramenId', async (req, res, next) => {
  try {
    const { ramenId } = req.params;
    const { count } = req.body;

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
      res.status(401);
      next({
        error: 'InvalidTokenError',
        message: "You must be logged in to perform this action"
      });
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id: userId } = jwt.verify(token, JWT_SECRET);

      if (userId) {
        const newUserItem = await createUserItem({userId, ramenId, count});
        res.send(newUserItem);
        }
        else {
          next({
            error: 'UnauthorizedRequestError',
            message: 'You are not authorized to view this data'
          });
        }
      }
    }
    catch (error) {
      next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
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
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id: tokenId } = jwt.verify(token, JWT_SECRET);

      if (tokenId) {
        const tokenUser = await getUserById(tokenId);

        if (tokenUser.isAdmin || tokenId == userId) {
          const selectedUsersItems = await getUsersItemsByUserId(userId);
          res.send(selectedUsersItems);

        }
        else {
          next({
            error: 'UnauthorizedRequestError',
            message: 'You are not authorized to view this data'
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:userItemId', async (req, res, next) => {
  try {
    const { userItemId } = req.params;
    const { count } = req.body;

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');


    if (!auth) {
      res.status(401);
      next({
        error: 'InvalidTokenError',
        message: "You must be logged in to perform this action"
      });

    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id: tokenId } = jwt.verify(token, JWT_SECRET);

      if (tokenId) {
        const tokenUpdateUserItemCount = await updateUserItemCount({ id: userItemId, count });
        res.send(tokenUpdateUserItemCount);
      }
      else {
        next({
          error: 'UnauthorizedRequestError',
          message: 'You are not authorized to view this data'
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:userItemId', async (req, res, next) => {
  try {
    const { userItemId } = req.params;

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
      res.status(401);
      console.log("reached here: 1", auth);
      next({
        error: 'InvalidTokenError',
        message: "You must be logged in to perform this action"
      });

    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id: tokenId } = jwt.verify(token, JWT_SECRET);
      console.log("userItemId API: ", userItemId);
      const userItem = await getUserItemByUserItemId({ userItemId });
      //console.log("userItem: ", userItem);

      if (tokenId == userItem.userId) {
        const tokenDeleteUserItem = await deleteUserItem({ id: userItemId });
        res.send(tokenDeleteUserItem);
        console.log("reached here: 2");
      }
      else {
        next({
          error: 'UnauthorizedRequestError',
          message: 'You are not authorized to delete this data'
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
