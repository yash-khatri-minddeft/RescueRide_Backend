const express = require('express')
const { adminaddController, adminaddambulanceController, adminaddhospitalController, admingethospitalController, admingetallController, admingetambulanceController, controllerPasswordUpdate } = require('../controllers/adminAddController')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-addcontroller', authmiddleware, adminaddController);

router.post('/admin-addambulance', authmiddleware, adminaddambulanceController);

router.post('/admin-addhospital', authmiddleware, adminaddhospitalController);

router.get('/admin-getallcontroller', authmiddleware, admingetallController);

router.get('/admin-gethospital', authmiddleware, admingethospitalController);

router.get('/admin-getambulance', authmiddleware, admingetambulanceController)

router.post('/ctrl-pass-update', controllerPasswordUpdate)

module.exports = router;