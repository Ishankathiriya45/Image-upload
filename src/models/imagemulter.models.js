"use strict";
const { Model } = require("sequelize");
const {
  CommonUtil: { getFileUrl },
} = require("../util");
module.exports = (sequelize, DataTypes) => {
  class ImageMulter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImageMulter.init(
    {
      image_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("image")
            ? getFileUrl("multer", this.getDataValue("image"))
            : getFileUrl("multer", "default.png");
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "ImageMulter",
      tableName: "imagemulter",
    }
  );
  return ImageMulter;
};
