'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prepStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  prepStep.init({
    prepId: DataTypes.INTEGER,
    stepId: DataTypes.INTEGER,
    checked: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'prepStep',
  });
  return prepStep;
};