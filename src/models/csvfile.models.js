'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CsvFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CsvFile.init({
    csv_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    year: DataTypes.STRING,
    industry_code_ANZSIC: DataTypes.STRING,
    industry_name_ANZSIC: DataTypes.STRING,
    rme_size_grp: DataTypes.STRING,
    variable: DataTypes.STRING,
    value: DataTypes.STRING,
    unit: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'CsvFile',
    tableName: 'csvfile'
  });
  return CsvFile;
};