const multer = require('multer')
console.log("Hello")
const storageImg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/multer')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storageImg })

const mulImgUpload = async (req, res) => {
    const image = req.file.filename
    res.send({ msg: 'Image uploaded', image })
}

module.exports = {
    mulImgUpload,
    upload
}
