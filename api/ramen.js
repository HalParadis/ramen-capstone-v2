const express = require('express');
const router = express.Router();

const {
  getAllRamen,
  getRamenById
} = require('../db/models');

//GET /api/ramen
router.get('/', async (req, res, next) => {
  try {
    const ramen = await getAllRamen();
    res.send(ramen);
  } catch (error) {
    next(error);
  }
});

//GET /api/ramen/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 

    if (id) {
      const ramen = await getRamenById(id);
      res.send(ramen);
    } 
    else {
      next({
        name: 'NoIdError',
        message: 'No ID provided!'
      });
    }
    
  } catch (error) {
    next(error);
  }
});



module.exports = router;