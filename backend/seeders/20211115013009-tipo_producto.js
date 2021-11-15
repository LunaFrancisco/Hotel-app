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
     await queryInterface.bulkInsert('tipo_producto', [
      {
          id:1,
          tipo: 'licores'
      },
      {
          id:2,
          tipo: 'bebida'
      },
      
      {
          id:3,
          tipo: 'comida'
      },
      {
          id:4,
          tipo: 'ropa'
      },
      {
          id:5,
          tipo: 'utencilios'
      },
      {
          id:6,
          tipo: 'otros'
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
     await queryInterface.bulkDelete('tipo_producto', null, {});
  }
};
