'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('menu', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          // This is a reference to another model
          model: {
            tableName: 'category',
            // schema: 'schema'
          },
          // This is the column name of the referenced model
          key: 'id',
        },
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: true
      },
      deleted_at: {
        type: 'TIMESTAMP',
        allowNull: true
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('menu');
  }
};
