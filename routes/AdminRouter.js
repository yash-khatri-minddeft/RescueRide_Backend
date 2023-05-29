const express = require('express');
const {adminRegisterController,adminLoginController, adminOTPController,authController,checkAdminLogin} = require('../controllers/adminCtrl')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-signup',authmiddleware,adminRegisterController);

router.post('/admin-login',adminLoginController);

router.post('/admin-otp',adminOTPController);

router.get('/getUserData',authmiddleware,authController);

router.get('/checkLogin',authmiddleware,checkAdminLogin);

module.exports = router;
