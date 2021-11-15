const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');

const Servicio_promociones = sequelize.define('servicio_promociones', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_tipo_pago: {
        type: Sequelize.INTEGER
    },
    id_producto1: {
        type: Sequelize.INTEGER
    },
    id_producto2: {
        type: Sequelize.INTEGER
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    id_servicio: {
        type: Sequelize.INTEGER
    }
}, {

    timestamps: false
});

module.exports = Servicio_promociones;