require("dotenv").config()
const apiRouter = require('express').Router();


const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

const ramenRouter = require('./ramen');
apiRouter.use('/ramen', ramenRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const usersItemsRouter = require('./users_items');
apiRouter.use('/users_items', usersItemsRouter);

apiRouter.use("*", (_req, res, next) => {
  res.status(404);
  res.send({ message: "Status code 404" });
});

apiRouter.use((error, req, res, next) => {
  res.status(500);
  res.send(error);
});

module.exports = apiRouter;
