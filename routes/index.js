const express = require('express');
const router = express.Router();
const bookRoute = require('./bookRoute');

router.use('/', bookRoute);

module.exports = router;