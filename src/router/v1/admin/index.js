const express = require("express");
const router = express();

router.use("/multer/single", require("./multerSingleImg.routes"));
router.use("/multer/multiple", require("./multerMultipleImg.route"));
router.use("/base", require("./base64.routes"));
router.use("/csv", require("./csv.routes"));
router.use("/excel", require("./excel.routes"));

module.exports = router;
