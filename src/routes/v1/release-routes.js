const express = require('express');
const {ReleaseController} = require('../../controllers');
const router = express.Router();

router.patch('/',ReleaseController.releaseLocker);

module.exports = router;