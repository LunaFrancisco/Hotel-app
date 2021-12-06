const { response } = require("express");

// Models
const Servicio = require("../models/servicio");
const Pedido = require("../models/pedido");
const Detalle_pedido = require("../models/detalle_pedido");
const Inventario = require("../models/inventario");
const Balance_aux = require("../models/balance_aux");
const Producto = require("../models/producto");

// Helpers
const cantidad_extras = require("../helpers/cantidad_extras");
const descInv = require("../helpers/desc-inv");

const agregarPedido = async (req, res = response) => {
    const { id_servicio, extras, metodo_de_pago } = req.body;

    try {
        const findServicio = await Servicio.findOne({
            where: { id: id_servicio }
        });
        if (!findServicio) {
            return res.status(200).json({
                ok: false,
                msg: "No existe el servicio",
            });
        }
        // Agrego los extras si existen tabla pedidos y producto pedido
        if (!extras) {
            return res.status(200).json({
                ok: false,
                msg: "No hay extras seleccionados",
            });
        }
        // Transformamos extras a un objeto
        const objCantidadExtras = cantidad_extras(extras);
        // [
        //     { id_producto: '1', cantidad: 1 },
        //     { id_producto: '2', cantidad: 2 },
        //     { id_producto: '3', cantidad: 3 },
        //     { id_producto: '4', cantidad: 4 }
        // ]
        const addPedido = await Pedido.create({
            id_servicio: id_servicio,
            id_tipo_pago: metodo_de_pago,
            estado: "Pendiente",
        });
        for (let extra of objCantidadExtras) {
            await Detalle_pedido.create({
                id_pedido: addPedido.id,
                id_producto: extra.id_producto,
                cantidad: extra.cantidad,
            });
            // Agregamos precio de cada producto a ventas en balance_aux
            const producto = await Producto.findOne({
                where: { id: extra.id_producto }
            });
            // Descontamos de inventario
            const resp = await descInv(extra.id_producto, extra.cantidad);
            if (!resp) {
                error = true
                msg = `El producto ${producto.nombre} no tiene stock suficiente`;
                break;
            }
            const balance_aux = await Balance_aux.findOne({
                where: { id: 1 }
            });
            const ingresos = producto.precio * extra.cantidad;
            balance_aux.ventas += ingresos;
            await balance_aux.save();
            if (metodo_de_pago === 1) {
                balance_aux.caja += ingresos;
                await balance_aux.save();
            }
            // Para tabla registro
            registro_monto += ingresos;
        };
        return res.json({
            ok: true,
            msg: "Pedido creado con exito",
        });

    } catch (e) {
        return res.status(200).json({
            ok: false,
            msg: "No se encontró el servicio",
        });
    }
};

module.exports = {
    agregarPedido,
};
