/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Files', 'url', {
      type: Sequelize.DataTypes.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Files', 'url');
  },
};
