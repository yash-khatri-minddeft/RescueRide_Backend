const express = require('express');
const {adminRegisterController,adminLoginController,authController} = require('../controllers/adminCtrl')

const router = express.Router();

router.post('/admin-signup',adminRegisterController)

router.post('/admin-login',adminLoginController)

router.post('/getUserData',authController)
