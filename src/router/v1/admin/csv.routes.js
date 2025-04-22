const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const upload = require('../../../service/multer.service');
const router = express()

let CsvCtr1 = new AdminModule.csvCtr1.CsvController()

router.post('/create',
    upload.single('csv_file'),
    async (req, res) => {
        const result = await CsvCtr1.uploadCsv(req, res)
        return res.status(result.status).send(result);
    }
)

router.post('/create/csvToDb',
    upload.single('csv_file'),
    async (req, res) => {
        const result = await CsvCtr1.uploadDbToCsv(req, res)
        return res.status(result.status).send(result);
    }
)

module.exports = router;