const { check } = require('express-validator');

exports.validSignup = [
    check('name', 'Name is required field').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password').isLength({ min: 7 }).withMessage('Password must be of at least 7 characters')
];

exports.validSignin = [
    check('email', 'Enter a valid email address').isEmail(),
    check('password').isLength({ min: 7 }).withMessage('Password must be of at least 7 characters')
];

exports.validForgotPassword = [
    check('email', 'Enter a valid email address').isEmail()
];

exports.validResetPassword = [
    check('newPassword').isLength({ min: 7 }).withMessage('Password must be of at least 7 characters')
];