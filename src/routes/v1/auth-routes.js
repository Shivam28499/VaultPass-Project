const express = require('express');
const {AuthController} = require('../../controllers');
const {AuthMiddleware} = require('../../middlewares');
const router = express.Router();

router.post('/signup',AuthMiddleware.validateAuthRequest,AuthController.signup);
router.post('/login',AuthMiddleware.validateAuthRequest,AuthController.login);
router.get('/me',AuthMiddleware.checkAuth,(req,res) => {
    return res.json({
        success: true,
        user: req.user
    })
})
module.exports = router;