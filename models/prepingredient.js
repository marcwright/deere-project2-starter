'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prepIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prepIngredient.belongsTo(models.Preparation, { 
         foreignKey: "prepId" 
      });
      prepIngredient.belongsTo(models.Ingredient, { 
        foreignKey: "ingredientId" 
      });
      // // prepIngredient.belongsTo(models.Preparation, { 
      // //    foreignKey: "id" 
      // // });
      // prepIngredient.hasMany(models.Ingredient, { 
      //    foreignKey: "prepId" 
      // });
    }
  };
  prepIngredient.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    prepId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    checked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'prepIngredient',
  });
  return prepIngredient;
};