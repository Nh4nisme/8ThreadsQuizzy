const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getCurrentUser, 
    updateProfile, 
    updatePassword, 
    requestAccountDeletion, 
    cancelAccountDeletion 
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, updatePassword);
router.post('/delete-request', authMiddleware, requestAccountDeletion);
router.post('/delete-cancel', authMiddleware, cancelAccountDeletion);

module.exports = router;
