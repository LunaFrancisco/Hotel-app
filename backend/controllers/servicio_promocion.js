const { response } = require("express");
const sequelize = require("../database/database");
const descInv = require("../helpers/desc-inv");
const Balance_aux = require("../models/balance_aux");
const Producto = require("../models/producto");
const Promocion = require("../models/promocion");
const Registro = require("../models/registro");
const Servicio = require("../models/servicio");

// Models
const Servicio_promociones = require("../models/servicio_promociones");

const agregarPromocion = async (req, res = response) => {
    try {
        // {
        //     "id_servicio": 3, // ID Habitación
        //     "promocion": {
        //         "id_promocion": 1,
        //         "id_productos": [1, 2]
        //     }
        // }
        const { id_servicio, promocion } = req.body;
        // Obtenemos la promocion pedida
        const promocionData = await Promocion.findOne({
            where: { id: promocion.id_promocion }
        });
        // Para obtener id_tipo_pago de una promocion actual
        const promocionAntigua = await Servicio_promociones.findOne({
            where: { id_servicio }
        });
        await Servicio_promociones.create({
            id_servicio,
            id_producto1: promocion.id_productos[0],
            id_producto2: promocion.id_productos[1],
            id_tipo_pago: promocionAntigua.id_tipo_pago,
            estado: false,
            id_promocion: promocion.id_promocion
        });
        // Descontamos productos de inventario
        descInv(promocion.id_productos[0], 1);
        descInv(promocion.id_productos[1], 1);
        // Agregamos los precios a ventas
        const balance_aux = await Balance_aux.findOne({
            where: { id: 1 }
        });
        balance_aux.ventas += promocionData.precio;
        await balance_aux.save();
        if (promocionAntigua.id_tipo_pago === 1) {
            balance_aux.caja += promocionData.precio;
            await balance_aux.save();
        }
        // Para tabla registro
        const servicio = await Servicio.findOne({
            where: { id: id_servicio }
        });
        // Producto 1
        const producto1 = await Producto.findOne({
            where: { id: promocion.id_productos[0] }
        });
        const producto2 = await Producto.findOne({
            where: { id: promocion.id_productos[1] }
        });
        await Registro.create({
            id_usuario: req.id_usuario,
            id_habitacion: servicio.id_habitacion,
            fecha: sequelize.literal("CURRENT_TIMESTAMP"),
            fecha_entrada: sequelize.literal("CURRENT_TIMESTAMP"),
            monto: promocionData.precio,
            observacion: `Se agrega la promoción ${promocion.id_promocion} al servicio de la habitación ${servicio.id_habitacion}. Productos: ${producto1.nombre} - ${producto2.nombre}.`,
        });
        return res.status(200).json({
            ok: true,
            msg: `Promoción ${promocion.id_promocion} agregada correctamente.`
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            ok: false,
            msg: "Error al agregar promoción, hable con el administrador"
        });
    }
};

module.exports = {
    agregarPromocion
};