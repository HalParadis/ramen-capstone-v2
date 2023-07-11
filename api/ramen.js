const express = require('express');
const router = express.Router();

const {
  getAllRamen,
  getRamenById,
  getUserById,
  updateRamen,
  deleteRamen,
  createRamen
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

router.post('/create', async (req, res, next) =>{
  try{
    if (req.user.isAdmin === true ){
      const newRamen = await createRamen({ ...req.body})
      res.send(newRamen);
    }
   } catch (error){
    next(error)
   } 
  })

router.patch('/update/:id', async (req, res, next) =>{
  try{
    const { id } = req.params;
    if (req.user.isAdmin === true && id ){
      const able = await updateRamen({id: id , ...req.body})
      res.send(able);
    }
   } catch (error){
    next(error)
   } 
  })


  router.delete('/delete/:id', async (req, res, next ) =>{
    try{
      const { id } = req.params;
      if (req.user.isAdmin === true ){
        const gone = await deleteRamen(id)
        res.send(gone);
      }
    } catch(error){
      next(error)
    }
  })


module.exports = router;