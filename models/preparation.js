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
      // define association here
    }
  };
  Preparation.init({
    date: DataTypes.DATE,
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