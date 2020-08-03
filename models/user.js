'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init(
    {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your name.'
        //   }
        // }
      },
      username: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your username.'
        //   }
        // }
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'Please, enter your password.'
        //   }
        // }
      }
    }, {
      sequelize,
      // validate: {
      //   dataNull() {
      //     if ( this.name === null || this.username === null || this.password === null) {
      //         throw new Error('Please, check your values aren\'t null');
      //     }
      //   }
      //},
      modelName: 'User',
    });
  return User;
};