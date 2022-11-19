const express = require('express')
const userProfileController = require('../Controller/profilecontroller');
const AuthverifyMiddleware = require('../Middleware/AuthVerifyMiddleware');
const routes = express.Router();

routes.post('/CreateProfile',userProfileController.CreateProfile);
routes.post('/UserLogin',userProfileController.UserLogin);
routes.get('/SelectProfile',AuthverifyMiddleware,userProfileController.SelectProfile);
routes.put('/UserProfileUpdate',AuthverifyMiddleware,userProfileController.UserProfileUpdate);

module.exports = routes;