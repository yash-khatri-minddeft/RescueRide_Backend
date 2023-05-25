const express = require('express');
const {adminRegisterController,adminLoginController, adminOTPController,authController} = require('../controllers/adminCtrl')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-signup',authmiddleware,adminRegisterController);

router.post('/admin-login',adminLoginController);

router.post('/admin-otp',adminOTPController);

router.post('/getUserData',authmiddleware,authController);

module.exports = router;
