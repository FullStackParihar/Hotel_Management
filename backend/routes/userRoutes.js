
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const userController = require('../controller/userController');

// router.post('/signup', userController.signup);
// router.post('/verifyOtp', userController.verifyOtp);
// router.post('/login', userController.login);
// router.get('/getUsers', userController.getUsers);
// router.patch('/update/:id', userController.patch);
// router.post('/forgot', userController.forgot);
// router.post('/resetPassword', userController.resetPassword);
// router.get('/me', auth, userController.getMe);

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.post('/signup', userController.signup);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/login', userController.login);
router.get('/getUsers', userController.getUsers);
router.patch('/update/:id', userController.patch);
router.post('/forgot', userController.forgot);
router.post('/resetPassword', userController.resetPassword);
router.get('/me', auth, userController.getMe);
router.put('/me', auth, userController.updateMe);

module.exports = router;