'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Steps",
      [
        {
          description: "Get your tortilla and add the cheese on it and fold it.",
          recipeId: 1
        },
        {
          description: "Put your folded tortilla in a hot pan.",
          recipeId: 1
        },
        {
          description: "Turn your tortilla and when the chesse has melted it is done.",
          recipeId: 1
        },
        {
          description: "In a hot pan put your tortillas.",
          recipeId: 2
        },
        {
          description: "When your tortillas are hot, put the beans on top.",
          recipeId: 2
        },
        {
          description: "Mix all the ingredients.",
          recipeId: 3
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
