const db = require("../../../models");
const { responseMsg } = require("../../../response");
const { FileService } = require("../../../service");
const ProductImagesModel = db.ProductImages;

class MulterMultipleImgController {
  constructor() {
    this.fileService = new FileService();
  }

  // multiple image upload crud operations...

  async createDiff01(req, res) {
    try {
      const files = req.files;
      const uploadedImages = await Promise.all(
        files.map(
          async (file) =>
            await this.fileService.uploadFile(
              file,
              "multer/productImgs",
              "disk",
              null
            )
        )
      );

      const arrayImage = uploadedImages.map((item) => ({
        imageUrl: item.fileName,
      }));

      const detail = await ProductImagesModel.bulkCreate(arrayImage);

      if (detail) {
        return responseMsg.successResponse(1, "Success", detail);
      } else {
        return responseMsg.validationError(0, "No image found");
      }
    } catch (error) {
      return responseMsg.serverError(0, "Failed", error.message);
    }
  }

  async createDiff02(req, res) {
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
