'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Ingredients",
      [
        {
          name: "Queso",
          quantity: 30,
          unit: "grs.",
          recipeId: 1
        },
        {
          name: "Tortilla",
          quantity: 1,
          unit: "PC",
          recipeId: 1
        },
        {
          name: "Salsa",
          quantity: 1,
          unit: "teaspoon",
          recipeId: 1
        },
        {
          name: "Fried Beans",
          quantity: 30,
          unit: "grs",
          recipeId: 2
        },
        {
          name: "Flour Tortilla",
          quantity: 3,
          unit: "PC",
          recipeId: 2
        },
        {
          name: "Lettuce",
          quantity: .5,
          unit: "PC",
          recipeId: 3
        },
        {
          name: "Onion",
          quantity: 10,
          unit: "Slices",
          recipeId: 3
        },
        {
          name: "Tomato",
          quantity: 6,
          unit: "Slices",
          recipeId: 3
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ingredients');
  }
};
