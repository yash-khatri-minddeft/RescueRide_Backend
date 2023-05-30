const express = require('express')
const { adminaddController, adminaddambulanceController, adminaddhospitalController, admingethospitalController, admingetallController, admingetambulanceController, controllerPasswordUpdate, checkControllerLogin,addBookingController } = require('../controllers/adminAddController')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-addcontroller', authmiddleware, adminaddController);

router.post('/admin-addambulance', authmiddleware, adminaddambulanceController);

router.post('/admin-addhospital', authmiddleware, adminaddhospitalController);

router.get('/admin-getallcontroller', authmiddleware, admingetallController);

router.get('/admin-gethospital', admingethospitalController);

router.get('/admin-getambulance', admingetambulanceController);

router.get('/check-login', authmiddleware, checkControllerLogin)

router.post('/ctrl-pass-update', controllerPasswordUpdate)

router.post('/add-booking',addBookingController);

module.exports = router;