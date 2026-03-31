const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth.middleware')

const { 
   HandleCreateUser,
   HandleUserProfile,
   HandleUserProfileUpdate,
   HandleUserLogin } = require('../controllers/user.controller')

// create user route
router.post('/register', HandleCreateUser);

//read loged in user
router.get("/profile", Auth,  HandleUserProfile);

//update User info
router.put('/profile', Auth,  HandleUserProfileUpdate)

// login user route
router.post("/login", HandleUserLogin);

module.exports = router;