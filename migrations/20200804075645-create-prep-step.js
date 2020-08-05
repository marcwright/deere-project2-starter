'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prepSteps', {
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
      stepId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Steps', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      checked: {
        type: Sequelize.BOOLEAN
      },
      comments: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('prepSteps');
  }
};