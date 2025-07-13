const db = require("../../../models");
const { responseMsg } = require("../../../response");
const ProductImagesModel = db.ProductImages;

class MulterMultipleImgController {
  constructor() {}

  // multiple image upload crud operations...

  async create(req, res) {
    try {
      const productImg = req.files.map((file) => ({
        imageUrl: file.filename,
      }));

      const detail = await ProductImagesModel.bulkCreate(productImg);

      if (detail) {
        return responseMsg.successResponse(1, "Success", detail);
      } else {
        return responseMsg.validationError(0, "No image found");
      }
    } catch (error) {
      return responseMsg.serverError(0, "Failed", error.message);
    }
  }
}

module.exports = MulterMultipleImgController;
