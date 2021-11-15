'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('promociones', [
      {
          id:1,
          horas:2,
          precio:12800,
          bebida:false,
          trago:false, 
      },
      {
          id:2,
          horas:3,
          precio:16000,
          bebida:true,
          trago:false, 
      },
      
      {
          id:3,
          horas:6,
          precio:19800,
          bebida:true,
          trago:true, 
      },
      {
          id:4,
          horas:10,
          precio:26900,
          bebida:true,
          trago:true, 
      }
      
      
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('promociones');
  }
};