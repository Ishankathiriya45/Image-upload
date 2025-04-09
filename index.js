const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./router/imageUpload.routes');

const app = express();
const PORT = 5012;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
