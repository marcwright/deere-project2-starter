'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Recipes",
      [
        {
          name: "Quesadilla",
          dificulty: "Easy",
          prepTime: "15:00"
        },
        {
          name: "Taco",
          dificulty: "Easy",
          prepTime: "15:00"
        },
        {
          name: "Ensalada",
          dificulty: "Medium",
          prepTime: "15:00"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Recipes');
  }
};
