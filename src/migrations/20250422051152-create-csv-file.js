'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('csvfile', {
      csv_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      year: {
        type: Sequelize.STRING
      },
      industry_code_ANZSIC: {
        type: Sequelize.STRING
      },
      industry_name_ANZSIC: {
        type: Sequelize.STRING
      },
      rme_size_grp: {
        type: Sequelize.STRING
      },
      variable: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('csvfile');
  }
};