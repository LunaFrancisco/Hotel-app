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
                id: 1,
                horas: 2,
                precio: 12800,
                bebida: false,
                trago: false,
                descripcion: 'Esta promoción no incluye nada'
            },
            {
                id: 2,
                horas: 3,
                precio: 16000,
                bebida: true,
                trago: false,
                descripcion: 'Esta promoción include 1 bebida'
            },

            {
                id: 3,
                horas: 6,
                precio: 19800,
                bebida: true,
                trago: true,
                descripcion: 'Esta promoción include 1 bebida y un trago. 6 Horas'
            },
            {
                id: 4,
                horas: 10,
                precio: 26900,
                bebida: true,
                trago: true,
                descripcion: 'Esta promoción include 1 bebida y un trago. 10 Horas'
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