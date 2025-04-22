const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const upload = require('../../../service/multer.service');
const router = express()

let ExcelCtr1 = new AdminModule.excelCtr1.ExcelController()

router.post('/create',
    async(req, res)=>{
        const result = await ExcelCtr1.craeteExcel(req, res)
        return res.status(result.status).send(result)
    }
)

router.post('/upload',
    upload.single('excel_file'),
    async(req, res)=>{
        const result = await ExcelCtr1.uploadExcel(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;