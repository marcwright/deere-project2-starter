'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prepIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prepId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Preparations', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Ingredients', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      checked: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prepIngredients');
  }
};