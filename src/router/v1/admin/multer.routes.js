const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const upload = require('../../../service/multer.service');
const router = express()

let MulterCtr1 = new AdminModule.multerCtr1.MulterController()

router.post('/create',
    upload.single('image'),
    async (req, res) => {
        const result = await MulterCtr1.createMulterData(req, res)
        return res.status(result.status).send(result);
    }
)

router.get('/list',
    async (req, res) => {
        const result = await MulterCtr1.listMulterData(req, res)
        return res.status(result.status).send(result);
    }
)

module.exports = router;