/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Categories', 'deletedAt', {
      type: Sequelize.DataTypes.STRING, allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'deletedAt');
  },
};
