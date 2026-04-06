const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getuser', authMiddleware, userController.getUser);
router.patch('/updateuser', authMiddleware, userController.updateUser);

module.exports = router;
