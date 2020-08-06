'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preparation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Preparation.hasMany(models.prepIngredient, { 
          foreignKey: 'prepId' });
      Preparation.hasMany(models.prepStep, { 
          as: 'pSteps',
          foreignKey: 'prepId' });
      Preparation.belongsTo(models.Recipe, {
          foreignKey: 'recipeId' 
      });
     }
  };
  Preparation.init({
    id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
    prepDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Preparation',
  });
  return Preparation;
};