const { response } = require("express");
const Tipo_habitacion = require("../models/tipo_habitacion");
const Cliente = require("../models/cliente");
const Habitacion = require("../models/habitaciones");
const Estado = require("../models/estado");
const Pedido = require("../models/pedido");
const Promocion = require("../models/promocion");
const Servicio = require("../models/servicio");
const Servicio_promocion = require("../models/servicio_promociones");
const Detalle_pedido = require("../models/detalle_pedido");
const Servicio_promociones = require("../models/servicio_promociones");
const sequelize = require("../database/database");

const Retiro = require("../models/retiro");
const Balance_aux = require("../models/balance_aux");
const Gasto_caja = require("../models/gasto_caja");
const Balance = require("../models/balance");

const calcularTotalVentas = async (req, res) => {
    const { id } = req.body;
    try {
        const findVentas = await Pedido.findAll();
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};

//registrar retiro
const newRetiro = async (req, res) => {
    const { id_usuario, monto, descripcion } = req.body;
    try {
        //primero hay que ver que el monto no sea mayor a el dinero en caja
        const compareCaja = await Balance_aux.findOne({
            where: {
                id: 1,
            },
            attributes: ["id", "retiros", "caja"],
        });
        if (monto > compareCaja.caja) {
            return res.json({
                ok: false,
                msg: "El Retiro supera el monto de la caja",
            });
        } else {
            //actualizar los retiros
            compareCaja.retiros = compareCaja.retiros + monto;
            compareCaja.caja = compareCaja.caja - monto;
            compareCaja.save();

            //registro en tabla retiro
            const nuevoRetiro = await Retiro.create({
                id_usuario,
                monto,
                descripcion,
                fecha: sequelize.literal("CURRENT_DATE"),
            });

            return res.json({
                ok: true,
                msg: "Retiro registrado",
            });
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};
//registrar gasto
const newGasto = async (req, res) => {
    const { id_usuario, monto, descripcion } = req.body;
    try {
        const compareCaja = await Balance_aux.findOne({
            where: {
                id: 1,
            },
            attributes: ["id", "gastos", "caja"],
        });
        if (monto > compareCaja.caja) {
            return res.json({
                ok: false,
                msg: "El Gasto supera el monto de la caja",
            });
        } else {
            //registro en tabla retiro
            const newGasto = await Gasto_caja.create({
                id_usuario,
                monto,
                descripcion,
                fecha: sequelize.literal("CURRENT_DATE"),
            });

            //actualizar los retiros
            compareCaja.gastos = compareCaja.gastos + monto;
            compareCaja.caja = compareCaja.caja - monto;
            compareCaja.save();

            return res.json({
                ok: true,
                msg: "Gasto registrado",
            });
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};
//realizar gasto_inventario desde inventario

//getall retiros
const allRetiros = async (req, res) => {
    // const { id } = req.body;
    try {
        const findRetiros = await Retiro.findAll({
            attributes: ["id", "id_usuario", "monto", "descripcion", "fecha"],
        });

        return res.json({
            ok: true,
            findRetiros,
        });
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};
//get all gastos
const allGastos = async (req, res) => {
    // const { id } = req.body;
    try {
        const findGastos = await Gasto_caja.findAll({
            attributes: ["id", "id_usuario", "monto", "descripcion", "fecha"],
        });

        return res.json({
            ok: true,
            findGastos,
        });
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};

//realizar cierre de caja
const cierreCaja = async (req, res) => {
    const { id_usuario } = req.body;
    try {
        const getBalance = await Balance_aux.findOne({
            where: { id: 1 },
            // attributes:['id','ventas','gastos','retiros','caja','id_balance']
        });
        console.log(getBalance.id_balance);

        const updateBalance = await Balance.update(
            {
                id_usuario: id_usuario,
                ventas_total: getBalance.ventas,
                retiros_total: getBalance.retiros,
                gastos_total: getBalance.gastos,
                caja_final: getBalance.caja,
                fecha: sequelize.literal("CURRENT_DATE")
            },

            {
                where: {
                    id: getBalance.id_balance,
                },
                attributes: ['caja_final'],
            }
        );

        const getValue = await Balance.findOne({
            where: {
                id: getBalance.id_balance
            }
        },
            {
                attributes: ['caja_final']
            });
        console.log(getValue.caja_final);
        const newBalance = await Balance.create(
            {
                // id_usuario:null,
                caja_anterior: getValue.caja_final,
                // ventas_total:null,
                // retiros_total: null,
                // gastos_total: null,
                // caja_final:null,
                // fecha : null
            },
            {
                attributes: ["id"],
            }
        );

        //actualizo la tabla aux a cero menos la caja
        getBalance.ventas = 0;
        getBalance.retiros = 0;
        getBalance.gastos = 0;
        getBalance.id_balance = newBalance.id;
        getBalance.save();

        return res.json({
            ok: true,
            msg: "Balance realizado con exito",
        });
    } catch (e) {
        res.json({
            ok: false,
            msg: "error, contacte con el administrador",
        });
    }
};

module.exports = {
    newRetiro,
    newGasto,
    allRetiros,
    allGastos,
    cierreCaja,
};
