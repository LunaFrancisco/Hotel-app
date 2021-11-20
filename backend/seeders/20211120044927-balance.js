'use strict';
const sequelize = require('../database/database');

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
        await queryInterface.bulkInsert('balance', [
            {
                id: 1,
                id_usuario: null,
                caja_anterior: 50000,
                ventas_total:null,  
              retiros_total:null,  
              gastos_total:null,  
              caja_final:null,  
              fecha:null 
              
            }


        ], {});

        await sequelize.query('ALTER SEQUENCE promociones_id_seq RESTART WITH 5;')
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('balance');
    }
};