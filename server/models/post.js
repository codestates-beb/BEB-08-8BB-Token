'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },    
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    token_id: DataTypes.INTEGER,
    tx_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
    tableName: 'post'
  });
  return post;
};