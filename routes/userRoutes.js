const express = require('express');
const authController = require('../controllers/authController');
const userContoroller = require('../controllers/userController')
//Route Handlers

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect,authController.updatePassword);
router.patch('/updateMe', authController.protect, userContoroller.updateMe);
router.delete('/deleteMe', authController.protect, userContoroller.deleteMe);
router.get('/me', authController.protect, userContoroller.getMe, userContoroller.getUser);


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