const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./../controllers/handlerFactory');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys (obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find();
    // query.sort().select().skip().limit()
  
    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
}); 

exports.updateMe = catchAsync(async(req, res, next) => {
    //1) create error if user post password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password update please use /updateMyPassword', 400))
    }

    //2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    //3) update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody,{
        new: true,
        runValidators: true
    });


    res.status(200).json({
        status: 'success',
        data:{
            user: updatedUser
        }
    })
});


exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data:{
            data: null
        }
    })
})

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This Route is not yet defined"
    });
};


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This Route is not yet defined"
    });
};


//Only for admin users not to attmpt to change password with this
exports.updateUser = factory.updateOne(User)

exports.deleteUser = factory.deleteOne(User);