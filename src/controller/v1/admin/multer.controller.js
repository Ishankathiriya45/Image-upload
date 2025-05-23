const db = require("../../../models");
const { responseMsg } = require("../../../response");
const fs = require('fs')
const path = require('path');
const imgUrl = process.env.IMAGE_FILE_URL;
const ImageMulterModel = db.ImageMulter;
const ProductImagesModel = db.ProductImages;

class MulterController {
    constructor() { }

    async createSingleImg(req, res) {

        let t = await db.sequelize.transaction()

        try {
            const { name } = req.body;

            const multerData = {
                name: name,
                image: req.file.filename,
            }
            // fileSizeKb(req.file.size)

            const detail = await ImageMulterModel.create(multerData, { transaction: t })
            const paths = `${imgUrl}/${path.basename(detail.image)}`

            if (detail) {
                await t.commit()
                // createImage(req.file.originalname, req.file.buffer)
                return responseMsg.successResponse(1, 'Success.', detail)
            } else {
                return responseMsg.notFound(0, 'No Data')
            }
        } catch (error) {

            await t.rollback()

            // if (req.file) {
            //     let filePath = path.join('public/uploads/multer', req.file.filename)
            //     if (fs.existsSync(filePath)) {
            //         fs.unlinkSync(filePath)
            //     }
            // }
            return responseMsg.serverError(0, 'Something went wrong', error.message)
        }
    }

    async createMultipleImg(req, res) {
        try {
            const productImg = req.files.map((file) => ({
                imageUrl: file.filename,
            }))

            const detail = await ProductImagesModel.bulkCreate(productImg)

            if (detail) {
                return responseMsg.successResponse(1, "Success", detail)
            } else {
                return responseMsg.validationError(0, "No image found")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Failed", error.message)
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