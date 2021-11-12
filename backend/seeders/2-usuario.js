"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "usuario",
      [
        {
            nombre:"User2",
            apellido:"des",
            rut:"555555-6",
            correo:"useradmin2@useradmin.com",
            telefono:"5553555",
            ireccion:"Casa 3",
            password:"holamundo",
            
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usuario", null, {});
  },
};