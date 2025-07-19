const { where } = require("sequelize");
const db = require("../../../models");
const { responseMsg } = require("../../../response");
const Image = db.ImageMulter;
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

      const detail = await Image.create(multerRequestPayload, {
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
      const detail = await Image.findAll({});

      if (detail) {
        return responseMsg.successResponse(1, "Success.", detail);
      } else {
        return responseMsg.notFound(0, "No Data");
      }
    } catch (error) {
      return responseMsg.serverError(0, "Something went wrong", error.message);
    }
  }

  async update(req, res) {
    try {
      const { imageId } = req.params;
      const { name } = req.body;
      const file = req.file;
      let image;

      const imageData = await Image.findByPk(imageId);

      if (!imageData) {
        return responseMsg.notFound(0, "Image not found", null);
      }

      let updateData = {};

      if (file) {
        const uploadFile = await this.fileService.uploadFile(
          file,
          "multer",
          "disk",
          null
        );
        image = uploadFile.fileName;
      }

      name ? (updateData.name = name) : null;
      image ? (updateData.image = image) : null;

      const update = await Image.update(updateData, {
        where: {
          image_id: imageId,
        },
      });

      const removeImg = imageData.image.split("multer/");
      if (imageData) {
        await this.fileService.unlinkFile(removeImg[1], "multer", "disk", null);
      }

      return responseMsg.successResponse(1, "Success", update);
    } catch (error) {
      return responseMsg.serverError(0, "Something went wrong", error.message);
    }
  }
}

module.exports = {
  MulterController,
};
