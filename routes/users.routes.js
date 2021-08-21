const router = require('express').Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users.controllers');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync (users.registerUser));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser);

router.get('/logout', users.logout);

module.exports = router;