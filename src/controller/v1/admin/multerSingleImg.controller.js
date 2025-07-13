const db = require("../../../models");
const { responseMsg } = require("../../../response");
const ImageMulterModel = db.ImageMulter;
const ProductImagesModel = db.ProductImages;
const { FileService } = require("../../../service");

class MulterController {
  constructor() {
    this.fileService = new FileService();
  }

  // single image upload crud operations...

  async create(req, res) {
    let t = await db.sequelize.transaction();

    try {
      const { name } = req.body;
      const file = req.file;

      const uploadFile = await this.fileService.uploadFile(
        file,
        "multer",
        "disk",
        null
      );

      const multerRequestPayload = {
        name: name,
        image: uploadFile.fileName,
      };
      // fileSizeKb(req.file.size)

      const detail = await ImageMulterModel.create(multerRequestPayload, {
        transaction: t,
      });
      //   const paths = `${imgUrl}/${path.basename(detail.image)}`;

      if (detail) {
        await t.commit();
        // createImage(req.file.originalname, req.file.buffer)
        return responseMsg.successResponse(1, "Success.", detail);
      } else {
        return responseMsg.notFound(0, "No Data");
      }
    } catch (error) {
      await t.rollback();

      // if (req.file) {
      //     let filePath = path.join('public/uploads/multer', req.file.filename)
      //     if (fs.existsSync(filePath)) {
      //         fs.unlinkSync(filePath)
      //     }
      // }
      return responseMsg.serverError(0, "Something went wrong", error.message);
    }
  }

  async list(req, res) {
    try {
      const detail = await ImageMulterModel.findAll({});

      if (detail) {
        return responseMsg.successResponse(1, "Success.", detail);
      } else {
        return responseMsg.notFound(0, "No Data");
      }
    } catch (error) {
      return responseMsg.serverError(0, "Something went wrong", error.message);
    }
  }
}

module.exports = {
  MulterController,
};
