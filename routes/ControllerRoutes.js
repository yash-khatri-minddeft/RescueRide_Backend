const express = require('express')
<<<<<<< HEAD
const { adminaddController, adminaddambulanceController, adminaddhospitalController, admingethospitalController, admingetallController, admingetambulanceController, controllerPasswordUpdate, checkControllerLogin,addBookingController } = require('../controllers/adminAddController')
=======
const { adminaddController, adminaddambulanceController, adminaddhospitalController, admingethospitalController, admingetallController, admingetambulanceController, controllerPasswordUpdate, checkControllerLogin, usergethospitalController } = require('../controllers/adminAddController')
>>>>>>> 3a246195ee9488bfa739b50dee62794b2b97fd4a
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

module.exports = router;