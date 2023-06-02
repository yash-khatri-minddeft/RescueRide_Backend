const express = require('express');
const AuthMiddleWare = require('../middlewares/AuthMiddleWare');
const { checkLogin, authController } = require('../controllers/driverCtrl');
const router = express.Router();

router.get('/check-login', AuthMiddleWare, checkLogin)

router.get('/getUserData', AuthMiddleWare, authController);

module.exports = router;