const express = require("express");
const {
  AdminModule: { MulterMultipleImgController },
} = require("../../../controller/v1");
const upload = require("../../../service/multer.service");
const multer = require("multer");
const { responseMsg } = require("../../../response");
const {
  ImageUtil: { fileUpload },
} = require("../../../util");
const router = express();

let MulterCtrl = new MulterMultipleImgController();

router.post("/create-productImg02", async (req, res) => {
  upload.array("imageUrl", 3)(req, res, async function (error) {
    if (error instanceof multer.MulterError) {
      if (error.code == "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(422)
          .send(
            responseMsg.validationError(
              0,
              "Too many files uploaded. Max 3 allowed."
            )
          );
      }
    } else {
      const result = await MulterCtrl.createDiff02(req, res);
      return res.status(result.status).send(result);
    }
  });
});

router.post(
  "/create-productImg01",
  fileUpload().array("imageUrl", 4),
  async (req, res) => {
    const result = await MulterCtrl.createDiff01(req, res);
    return res.status(result.status).send(result);
  }
);

module.exports = router;
