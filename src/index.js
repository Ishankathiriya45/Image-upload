require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const db = require('./models');

const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use('/public', express.static(path.join(__dirname, '../public')))

// Apply the rate limiting middleware to all requests.
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: process.env[`REQUEST_LIMIT_${process.env.RUN_MODE}`],
  legacyHeaders: false,
  message: "You have exceeded your requests per minute limit.",
})
app.use(limiter)

app.use('/api', require('./router'))

const port = process.env['PORT_' + process.env.RUN_MODE]
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// (()=>{
//   console.log('Node',DB_NAME)
// })();
