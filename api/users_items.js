const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {
  getUsersItemsByUserId,
  updateUserItemCount,
  deleteUserItem
} = require('../db/models');


router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    const prefix = 'Bearer ';
    const auth = req.header('/Authorization');

    if (!auth) {
      res.status(401);
      console.log("auth:", auth);
      next({
        error: 'InvalidTokenError',
        message: "You must be logged in to perform this action"
      });
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id: tokenId } = jwt.verify(token, JWT_SECRET);

      if (tokenId) {
        const tokenUsersItems = await getUsersItemsByUserId(userId);
        res.send(tokenUsersItems);

        if (tokenUsersItems.isAdmin || tokenId == userId) {
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

    const prefix = 'Bearer ';
    const auth = req.header('/Authorization');

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

router.delete('/users_items/:userItemId', async (req, res, next) => {
  try {
    const { userItemId } = req.params;

    const prefix = 'Bearer ';
    const auth = req.header('/Authorization');

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

        const tokenDeleteUserItem = await deleteUserItem({ id: userItemId});
        res.send(tokenDeleteUserItem);
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

module.exports = router;
