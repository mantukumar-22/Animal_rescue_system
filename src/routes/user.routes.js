
const express = require('express');
const { userRegister, userLogin, getProfile, userLogout } = require('../controller/user.controller');
const authMiddleware  = require('../middleware/auth.middleware.js');
const router = express.Router();







router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/profiles', authMiddleware, getProfile);
router.get('/logout', userLogout);





module.exports = router;