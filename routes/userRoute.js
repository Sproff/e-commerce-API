const router = require('express').Router();
const {createUser, loginUser} = require('../controllers/userController');

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

// router.route('/logout').post(checkAuthorization, logoutUser);

module.exports = router;
