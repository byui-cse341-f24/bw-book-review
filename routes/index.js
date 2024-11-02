const express = require('express');
const router = express.Router();
const bookRoute = require('./bookRoute');
const userRoute = require('./userRoute');

router.use('/', bookRoute);
router.use('/', userRoute);

module.exports = router;