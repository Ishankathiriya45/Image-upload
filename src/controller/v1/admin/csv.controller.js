const fs = require('fs')
const path = require('path')
const csv = require('csv-parser');
const db = require('../../../models');
const { responseMsg } = require('../../../response');
const CsvFileModel = db.CsvFile;

class CsvController {
    constructor() { }

    async uploadCsv(req) {
        try {
            return new Promise((resolve, reject) => {
                const resultData = [];
                const csv_file = req.file.path;

                fs.createReadStream(csv_file)
                    .pipe(csv())
                    .on('data', (data) => resultData.push(data))
                    .on('end', () => resolve(
                        responseMsg.successResponse(1, 'Success', resultData)
                    ))
                    .on('error', reject);
            })
        } catch (error) {
            return responseMsg.serverError(0, 'CSV processed Failed', error.message)
        }
    }

    async uploadDbToCsv(req) {
        try {
            return new Promise((resolve, reject) => {
                const csvData = [];
                const csv_file = req.file.path;

                fs.createReadStream(csv_file)
                    .pipe(csv())
                    .on('data', (data) => csvData.push(
                        {
                            year: data.year,
                            industry_code_ANZSIC: data.industry_code_ANZSIC,
                            industry_name_ANZSIC: data.industry_name_ANZSIC,
                            rme_size_grp: data.rme_size_grp,
                            variable: data.variable,
                            value: data.value,
                            unit: data.unit,
                        }
                    ))
                    .on('end', async () => {
                        const csvDetail = await CsvFileModel.bulkCreate(csvData)
                        resolve(
                            responseMsg.successResponse(1, 'Csv file uploaded', csvDetail)
                        )
                    })
                    .on('error', reject)
            })
        } catch (error) {
            responseMsg.serverError(0, 'Something went wrong', error.message)
        }
    }
}

module.exports = {
    CsvController,
}