const express = require('express');
const AuthMiddleWare = require('../middlewares/AuthMiddleWare');
const { checkLogin, authController,driverLoginController,driverOTPController, updateAmbulanceLocation, accpetBookingRequest } = require('../controllers/driverCtrl');
const router = express.Router();

router.get('/check-login', AuthMiddleWare, checkLogin)

router.get('/getUserData', AuthMiddleWare, authController);

router.post('/driver-login',driverLoginController)

router.post('/driver-otp',driverOTPController);

router.post('/update-ambulance-location', AuthMiddleWare, updateAmbulanceLocation)

router.post('/update-booking-status', AuthMiddleWare, accpetBookingRequest);

module.exports = router;