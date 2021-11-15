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
     await queryInterface.bulkInsert('bodega', [
      {
          
        id_producto: 1,
        cantidad:100,
        cantidad_minima:24
      },
      {
          
        id_producto: 2,
        cantidad:100,
        cantidad_minima:24
      },
      {
          
        id_producto: 3,
        cantidad:48,
        cantidad_minima:24
      },
      {
          
        id_producto: 4,
        cantidad:48,
        cantidad_minima:24
      },
      {
          
        id_producto: 5,
        cantidad:48,
        cantidad_minima:24
      },
      {
          
        id_producto: 6,
        cantidad:48,
        cantidad_minima:24
      },
      {
          
        id_producto: 7,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 8,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 9,
        cantidad:22,
        cantidad_minima:24
      },
      {
          
        id_producto: 10,
        cantidad:22,
        cantidad_minima:24
      },
      {
          
        id_producto: 11,
        cantidad:43,
        cantidad_minima:24
      },
      {
          
        id_producto: 12,
        cantidad:65,
        cantidad_minima:24
      },
      {
          
        id_producto: 13,
        cantidad:54,
        cantidad_minima:24
      },
      {
          
        id_producto: 14,
        cantidad:44,
        cantidad_minima:24
      },
      {
          
        id_producto: 15,
        cantidad:34,
        cantidad_minima:24
      },
      {
          
        id_producto: 16,
        cantidad:65,
        cantidad_minima:24
      },
      {
          
        id_producto: 17,
        cantidad:76,
        cantidad_minima:24
      },
      {
          
        id_producto: 18,
        cantidad:100,
        cantidad_minima:24
      },
      {
          
        id_producto: 19,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 20,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 21,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 22,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 23,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 24,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 25,
        cantidad:45,
        cantidad_minima:24
      },
      {
          
        id_producto: 26,
        cantidad:5,
        cantidad_minima:2
      },
      {
          
        id_producto: 27,
        cantidad:5,
        cantidad_minima:2
      },
     
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('bodega', null, {});
  }
};
