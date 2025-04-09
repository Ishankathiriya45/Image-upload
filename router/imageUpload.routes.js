const express = require('express');
const { imageUpload } = require('../base64ImgUpload');
const { mulImgUpload, upload } = require('../multerImgUpload');
const router = express.Router()

router.post('/base64-upload', imageUpload)

router.post('/multer-upload', upload.single('image'), mulImgUpload)

module.exports = {
    router
}