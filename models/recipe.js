'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.hasMany(models.Ingredient, { 
        foreignKey: "recipeId" 
      });
      Recipe.hasMany(models.Step, { 
        foreignKey: "recipeId" 
      });
    }
  };
  Recipe.init({
    name: DataTypes.STRING,
    dificulty: DataTypes.STRING,
    prepTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};