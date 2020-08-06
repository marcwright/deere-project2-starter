'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Step.belongsTo(models.Recipe, { 
        foreignKey: "recipeId" 
      });
      Step.hasMany(models.prepStep, {
           //as: "stepPS",
           foreignKey: 'stepId',
      }); 
      // Step.belongsToMany(models.Preparation, { 
      //   as: "stepPre",
      //   through: 'prepSteps',
      //   foreignKey: 'stepId',
      //   otherKey: 'prepId',
      // });
    }
  };
  Step.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.TEXT,
    recipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Step',
  });
  return Step;
};