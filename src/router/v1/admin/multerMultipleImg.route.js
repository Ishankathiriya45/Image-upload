const express = require("express");
const {
  AdminModule: { MulterMultipleImgController },
} = require("../../../controller/v1");
const upload = require("../../../service/multer.service");
const multer = require("multer");
const { responseMsg } = require("../../../response");
const router = express();

let MulterCtrl = new MulterMultipleImgController();

router.post("/create-productImg", async (req, res) => {
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
      const result = await MulterCtrl.create(req, res);
      return res.status(result.status).send(result);
    }
  });
});

module.exports = router;
