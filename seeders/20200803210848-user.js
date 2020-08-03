'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Sergio Sarmiento",
          username: "sergio",
          password: "sarmiento"
        },
        {
          name: "Macario Schettino",
          username: "macario",
          password: "macario"
        },
        {
          name: "Raymundo Riva",
          username: "raymundo",
          password: "riva"
        },
        {
          name: "Carlos Loret",
          username: "carlos",
          password: "loret1"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
