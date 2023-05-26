const express = require('express');
const {adminRegisterController,adminLoginController, adminOTPController,authController,checkLoginController} = require('../controllers/adminCtrl')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-signup',authmiddleware,adminRegisterController);

router.post('/admin-login',adminLoginController);

router.post('/admin-otp',adminOTPController);

router.get('/getUserData',authmiddleware,authController);

router.get('/checkLogin',authmiddleware,checkLoginController);

module.exports = router;
