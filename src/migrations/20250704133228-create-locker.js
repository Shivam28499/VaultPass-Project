'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lockers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lockerNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },
      travelerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'travelers',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lockers');
  }
};