const db = require("../../../models");
const { responseMsg } = require("../../../response");
const ImageMulterModel = db.ImageMulter;
const fs = require('fs')
const path = require('path');
const imgUrl = process.env.IMAGE_FILE_URL;

class MulterController {
    constructor() { }

    async createMulterData(req, res) {
        try {
            const { name } = req.body;

            const multerData = {
                name: name,
                image: req.file.filename,
            }
            // fileSizeKb(req.file.size)

            const detail = await ImageMulterModel.create(multerData)
            const paths = `${imgUrl}/${path.basename(detail.image)}`
            if (detail) {
                // createImage(req.file.originalname, req.file.buffer)
                return responseMsg.successResponse(1, 'Success.', detail)
            } else {
                return responseMsg.notFound(0, 'No Data')
            }
        } catch (error) {
            // if (req.file) {
            //     let filePath = path.join('public/uploads/multer', req.file.filename)
            //     if (fs.existsSync(filePath)) {
            //         fs.unlinkSync(filePath)
            //     }
            // }
            return responseMsg.serverError(0, 'Something went wrong', error.message)
        }
    }

    async listMulterData(req, res) {
        try {
            const detail = await ImageMulterModel.findAll({})

            if (detail) {
                return responseMsg.successResponse(1, 'Success.', detail)
            } else {
                return responseMsg.notFound(0, 'No Data')
            }
        } catch (error) {
            return responseMsg.serverError(0, 'Something went wrong', error.message)
        }
    }
}

module.exports = {
    MulterController,
}