const express = require('express');
const AuthMiddleWare = require('../middlewares/AuthMiddleWare');
const { checkLogin, authController,driverLoginController,driverOTPController } = require('../controllers/driverCtrl');
const router = express.Router();

router.get('/check-login', AuthMiddleWare, checkLogin)

router.get('/getUserData', AuthMiddleWare, authController);

router.post('/driver-login',driverLoginController)

router.post('/driver-otp',driverOTPController);

module.exports = router;