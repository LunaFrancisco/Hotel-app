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
     await queryInterface.bulkInsert('estado', [
      {
          id:1,
          estado:'Disponible'
      },
      {
          id:1,
          estado:'Ocupada'
      },
      {
          id:1,
          estado:'Aseo'
      },
      {
          id:1,
          estado:'Mantenimiento'
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
     await queryInterface.bulkDelete('estado');
  }
};
