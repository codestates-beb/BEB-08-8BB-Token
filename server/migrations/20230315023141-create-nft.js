'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      token_uri: {
        type: Sequelize.STRING,
      },
      token_id: {
        type: Sequelize.INTEGER
      },
      tx_hash: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nft');
  }
};