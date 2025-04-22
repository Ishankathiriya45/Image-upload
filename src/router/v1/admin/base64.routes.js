const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const router = express()

let Base64Ctr1 = new AdminModule.base64Ctr1.Base64Controller()

router.post('/create',
    async (req, res) => {
        const result = await Base64Ctr1.createBase(req, res)
        return res.status(result.status).send(result);
    }
)

module.exports = router;