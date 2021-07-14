const bcrypt = require('bcryptjs'); //instalamos bcrytpjs e importamos
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    profile_photo: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
  });
  //encriptar la contraseña del usuario
  Users.beforeCreate(async(user)=>{
    try{
      let hash = await bcrypt.hash(user.password, 8); //generamos el has
      user.password = hash; //asignamos el hash a la contraseña que se genero en la base de datos
      return user.password; //finalizamos
    }catch(error){
      throw new Error('Nose pudo encriptar la contraseña');
    }
  });

  return Users;
};