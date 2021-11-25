const Inventario = require("../models/inventario");

export const descontarInventario = (id, cantidad) => {
    const producto = await Inventario.findOne({
        where: { id }
    });
    if (producto.cantidad > cantidad) {
        producto.cantidad -= cantidad;
        return true;
    }
    else {
        return false
    }
};