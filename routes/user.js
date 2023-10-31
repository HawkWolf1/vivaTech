const express = require('express');

const router = express.Router();

const userController = require('../controllers/userC')
const userAuthentication = require('../middleware/auth')


router.post('/user/add-user',  userController.addUser)
router.post('/user/login', userController.loginN)
router.post('/user/verify-otp', userController.verifyOTP)

router.get('/user/profile',userAuthentication.authenticate, userController.userInfo )



module.exports = router