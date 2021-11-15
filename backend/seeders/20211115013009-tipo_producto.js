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
          tipo: 'Licores'
      },
      {
          id:2,
          tipo: 'Bebida'
      },
      
      {
          id:3,
          tipo: 'Comida'
      },
      {
          id:4,
          tipo: 'Ropa'
      },
      {
          id:5,
          tipo: 'Utencilios'
      },
      {
          id:6,
          tipo: 'Otros'
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
