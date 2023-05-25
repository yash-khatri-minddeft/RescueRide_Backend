const express = require('express');
const {adminRegisterController,adminLoginController,authController} = require('../controllers/adminCtrl')
const authmiddleware = require('../middlewares/AuthMiddleWare')

const router = express.Router();

router.post('/admin-signup',authmiddleware,adminRegisterController)

router.post('/admin-login',authmiddleware,adminLoginController)

router.post('/getUserData',authmiddleware,authController)
