"use strict";
const { Model } = require("sequelize");
const {
  CommonUtil: { getFileUrl },
} = require("../util");
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductImages.init(
    {
      image_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue("imageUrl")
            ? getFileUrl("multer/productImgs", this.getDataValue("imageUrl"))
            : getFileUrl("multer/productImgs", "default.png");
        },
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "ProductImages",
      tableName: "productimages",
    }
  );
  return ProductImages;
};
