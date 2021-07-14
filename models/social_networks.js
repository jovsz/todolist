'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialNetwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialNetwork.init({
    user_id: DataTypes.INTEGER,
    provider: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SocialNetwork',
    tableName: 'social_networks'
  });
  return SocialNetwork;
};