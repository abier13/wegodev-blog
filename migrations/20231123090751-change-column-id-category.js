/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn('Categories', 'id', {
      type: Sequelize.UUID,
    });
  },
};
