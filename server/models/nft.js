'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }
  nft.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    img_url: DataTypes.STRING,
    comment: DataTypes.STRING,
    token_uri: DataTypes.STRING,
    token_id: DataTypes.INTEGER,
    tx_hash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'nft',
    tableName: 'nft'
  });
  return nft;
};