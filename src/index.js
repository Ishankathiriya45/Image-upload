require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const db = require('./models');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')))

app.use('/api', require('./router'))

const port = process.env['PORT_' + process.env.RUN_MODE]
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// (()=>{
//   console.log('Node',DB_NAME)
// })();
