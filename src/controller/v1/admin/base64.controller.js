const db = require("../../../models")
const fs = require('fs');
const path = require('path');
const { responseMsg } = require("../../../response");
const ImageBase64Model = db.ImageBase64;

class Base64Controller {
    constructor() { }

    async createBase(req, res) {
        try {
            const { name, base64Img, filename } = req.body;

            if(!base64Img||!filename){
                return responseMsg.validationError(0, 'base64Img and filename missing')
            }

            const match = base64Img.match(/^data:image\/([a-zA-Z]+);base64,/)

            if(!match){
                return responseMsg.validationError(0, 'Invalid base64 image format')
            }

            const fileType = match[1]
            const base64Data = base64Img.replace(/^data:image\/[a-zA-Z]+;base64,/, '')

            const filePath = path.join(__dirname, '../../../../public/uploads/base64', `${filename}.${fileType}`)
            const resPath = `${filename}.${fileType}`;

            if(!fs.existsSync(path.dirname(filePath))){
                fs.mkdirSync(path.dirname(filePath), {recursive: true})
            }

            fs.writeFileSync(filePath, base64Data, {encoding: 'base64'})

            const baseData = {
                name: name,
                filename: resPath,
            }

            const detail = await ImageBase64Model.create(baseData)

            if (detail) {
                return responseMsg.successResponse(1, 'Success.', detail)
            } else {
                return responseMsg.notFound(0, 'No data')
            }
        }catch(error){
            return responseMsg.serverError(0, 'Something went wrong', error.message)
        }
    }
}

module.exports = {
    Base64Controller,
}