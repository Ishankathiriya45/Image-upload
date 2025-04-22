const express = require('express')
const router = express()

router.use('/admin', require('./admin'))

module.exports = router;