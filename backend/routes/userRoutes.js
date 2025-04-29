 
// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/userController');

// router.post('/signup', userController.signup);
// router.post('/verifyOtp', userController.verifyOtp);
// router.post('/login', userController.login);
// router.get('/getUsers', userController.getUsers);
// router.get('/update', userController.patch);
// router.get('/forgot', userController.forgot);


// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.post('/signup',auth, userController.signup);
router.post('/verifyOtp',auth, userController.verifyOtp);
router.post('/login', userController.login);
router.get('/getUsers', userController.getUsers);
router.patch('/update/:id',auth, userController.patch);
router.post('/forgot', userController.forgot);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;