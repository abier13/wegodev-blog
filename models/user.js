<<<<<<< HEAD
'use strict';
const {
  Model, Sequelize,
} = require('sequelize');
=======
const {
  Model, Sequelize,
} = require('sequelize');

>>>>>>> post
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      // define association here
=======
      User.belongsTo(models.File, {
        foreignKey: 'avatar',
        as:'Avatar',
      });
>>>>>>> post
    }
  }
  User.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
<<<<<<< HEAD
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('Super Admin', 'Creator'),
      allowNull: false,
=======
    role: {
      type: Sequelize.ENUM('Super Admin', 'Creator'),
      allowNull: false,
      defaultValue: 'Creator',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
>>>>>>> post
    },
    status: {
      type: Sequelize.ENUM('Active', 'Suspend'),
      allowNull: false,
    },
    avatar: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};
