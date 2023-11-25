'use strict';
const {
  Model, Sequelize,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Postcategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Postcategories.belongsTo(models.Posts, { foreignKey: 'postId', as: 'Post' });
      // Postcategories.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });
    }
  }
  Postcategories.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    postId: {
      type: Sequelize.UUID,
    },
    categoryId: {
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },

  }, {
    sequelize,
    paranoid: true,
    modelName: 'Postcategories',
  });
  return Postcategories;
};
