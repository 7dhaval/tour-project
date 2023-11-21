const express = require('express');
const router = express.Router();
const userContoroller = require('../controllers/userController')
//Route Handlers

router
   .route('/')
   .get(userContoroller.getAllUsers)
   .post(userContoroller.createUser);

router
   .route('/:id')
   .get(userContoroller.getUser)
   .patch(userContoroller.updateUser)
   .delete(userContoroller.deleteUser);

module.exports = router;   