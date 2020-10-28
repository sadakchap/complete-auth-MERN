const express = require('express');
const router = express.Router();

const { signup, signin, signout, userEmailVerify, sendForgotLink, userResetPassword } = require('../controllers/auth');
const { validSignup, validSignin, validForgotPassword, validResetPassword } = require('../helpers/valid');

router.post('/signup', validSignup, signup);
router.post('/signin', validSignin, signin);
router.get('/signout', signout);

router.post('/verify', userEmailVerify);
router.put('/user/password/forgot', validForgotPassword, sendForgotLink);
router.put('/user/password/reset', validResetPassword, userResetPassword);

module.exports = router;