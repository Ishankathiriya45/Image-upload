'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productimages', {
      image_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productimages');
  }
};