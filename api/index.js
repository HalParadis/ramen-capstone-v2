require("dotenv").config()
const apiRouter = require('express').Router();

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
  console.log("We entered 404 ")
  res.status(404);
  res.send({ message: "Status code 404" });
});

apiRouter.use((error, req, res, next) => {
  console.log("We entered 500 ", error.message)
  res.status(500);
  res.send(error);
});

module.exports = apiRouter;
