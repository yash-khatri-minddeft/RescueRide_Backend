const express = require('express')
const { adminaddController, adminaddambulanceController, adminaddhospitalController, admingethospitalController, admingetallController, admingetambulanceController, controllerPasswordUpdate, checkControllerLogin, usergethospitalController,addBookingController,controllerLoginController,controllerOTPController, authController,deleteController } = require('../controllers/adminAddController')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-addcontroller', authmiddleware, adminaddController);

router.post('/admin-addambulance', authmiddleware, adminaddambulanceController);

router.post('/admin-addhospital', authmiddleware, adminaddhospitalController);

router.get('/admin-getallcontroller', authmiddleware, admingetallController);

router.post('/user-gethospital', usergethospitalController);

router.get('/admin-gethospital',authmiddleware, admingethospitalController)

router.get('/admin-getambulance', admingetambulanceController);

router.get('/check-login', authmiddleware, checkControllerLogin)

router.post('/ctrl-pass-update', controllerPasswordUpdate)

router.post('/add-booking',addBookingController);

router.post('/controller-login',controllerLoginController)

router.post('/controller-otp',controllerOTPController);

router.get('/getUserData',authmiddleware, authController);

router.delete('/deleteController/:id',deleteController);

module.exports = router;