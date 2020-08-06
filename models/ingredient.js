'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.Recipe, { 
        foreignKey: "recipeId" 
      });
      Ingredient.hasMany(models.prepIngredient, { 
           //as: "ingrePI",
           foreignKey: 'ingredientId', 
      });
      // Ingredient.belongsToMany(models.Preparation, {
      //    as: "stepIngre",
      //    through: 'prepIngredients',
      //    foreignKey: 'ingredientId', 
      //    otherKey: 'prepId',
      // });
    }
  };
  Ingredient.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    quantity: DataTypes.NUMERIC,
    unit: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};