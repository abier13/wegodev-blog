'use strict';
const {
  Model, Sequelize,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsToMany(models.Categories, {
        through: 'Postcategories',
        foreignKey: 'postId',
        as: 'categories',
      });
      // Posts.belongsToMany(models.Category, {
      //   through: models.Postcategories,
      //   as: 'Categories',
      // });
    }
  }
  Posts.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('Draft', 'Published'),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
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
    modelName: 'Posts',
  });
  return Posts;
};
