const db = require("../../../models");
const { responseMsg } = require("../../../response");
const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')
const excelFileUrl = process.env.EXCEL_FILE_URL;
const ImageMulterModel = db.ImageMulter;
const ExcelFileModel = db.ExcelFile;

class ExcelController {
    constructor() { }

    async craeteExcel(req, res) {
        try {
            let multerData = [];

            const multerDetail = await ImageMulterModel.findAll()
            for (const item of multerDetail) {
                const detail = item.dataValues;
                multerData.push(detail)
            }
            const workBook = XLSX.utils.book_new()

            const multerDetailSheet = XLSX.utils.json_to_sheet(multerData)
            XLSX.utils.book_append_sheet(workBook, multerDetailSheet, 'multer sheet')
            const filePath = path.join('public/uploads/excel', `MulterReport-${Date.now()}.xlsx`)

            XLSX.writeFile(workBook, filePath)

            const pathe = `${excelFileUrl}/${path.basename(filePath)}`;

            return responseMsg.successResponse(1, 'Success.', pathe)
        } catch (error) {
            responseMsg.serverError(0, 'Failed.', error.message)
        }
    }

    async uploadExcel(req, res) {
        try {
            if (!req.file) {
                return responseMsg.validationError(0, 'Failed')
            }

            const excel_file = req.file.path;
            const filePath = (__dirname, excel_file)
            const workBook = XLSX.readFile(filePath)
            const sheet = workBook.Sheets[workBook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(sheet)

            if (!jsonData.length) {
                return responseMsg.validationError(0, 'length empty')
            }

            const detaile = await ExcelFileModel.bulkCreate(jsonData)
            return responseMsg.successResponse(1, 'Success', detaile)
        } catch (error) {
            return responseMsg.serverError(0, 'Failed', error.message)
        }
    }
}

module.exports = {
    ExcelController,
}