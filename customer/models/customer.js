'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.ARRAY(DataTypes.STRING),
    cart: DataTypes.ARRAY(DataTypes.STRING),
    wishlist: DataTypes.ARRAY(DataTypes.STRING),
    orders: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};