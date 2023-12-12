const express = require('express');
const authController = require('../controllers/authController');
const userContoroller = require('../controllers/userController')
//Route Handlers

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword',authController.updatePassword);
router.patch('/updateMe', userContoroller.updateMe);
router.delete('/deleteMe', userContoroller.deleteMe);
router.get('/me',userContoroller.getMe, userContoroller.getUser);

router.use(authController.restrictTo('admin'));

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