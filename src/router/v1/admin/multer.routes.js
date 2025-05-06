const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const upload = require('../../../service/multer.service');
const multer = require('multer');
const { responseMsg } = require('../../../response');
const router = express()

let MulterCtr1 = new AdminModule.multerCtr1.MulterController()

router.post('/create',
    upload.single('image'),
    async (req, res) => {
        const result = await MulterCtr1.createSingleImg(req, res)
        return res.status(result.status).send(result);
    }
)

router.post('/create-productImg',
    async (req, res) => {
        upload.array('imageUrl', 3)(req, res, async function (error) {
            if (error instanceof multer.MulterError) {
                if (error.code == "LIMIT_UNEXPECTED_FILE") {
                    return res.status(422).send(responseMsg.validationError(0, "Too many files uploaded. Max 3 allowed."))
                }
            } else {
                const result = await MulterCtr1.createMultipleImg(req, res)
                return res.status(result.status).send(result);
            }
        })
    }
)

router.get('/list',
    async (req, res) => {
        const result = await MulterCtr1.listMulterData(req, res)
        return res.status(result.status).send(result);
    }
)

module.exports = router;