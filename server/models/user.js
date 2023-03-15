'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.post);
      // this.hasMany(models.nft);
    }
  }
  user.init({
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.INTEGER
    // },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: DataTypes.STRING,
    token_amount: DataTypes.INTEGER,
    eth_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};