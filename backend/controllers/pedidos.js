const { response } = require("express");

const Servicio = require("../models/servicio");
const Pedido = require("../models/pedido");
const Detalle_pedido = require("../models/detalle_pedido");
const Inventario = require("../models/inventario");

const agregarPedido = async (req, res = response) => {
  const { id, extras } = req.body;

  try {
    const findServicio = await Servicio.findOne({
      where: {
        id,
      },
    });

    if (findServicio) {
      extras.forEach(async (product) => {
        const stockProduct = await Inventario.findOne({
          where: {
            id_producto: product.producto_id,
          },
          attributes: ["cantidad"],
        });
        console.log(stockProduct.cantidad);

        if (stockProduct.cantidad >= product.cantidad) {
          const updateInventory = await Inventario.update(
            {
              cantidad: stockProduct.cantidad - product.cantidad,
            },
            {
              where: { id_producto: product.producto_id },
            }
          );

          console.log("producto descontado");
        } else {
          return res.json({
            ok: false,
            msg: "No hay suficiente stock en inventario",
          });
        }
      });

      const createPedido = await Pedido.create({
        //id_tipo_pago: metodo_de_pago,
        estado: "pendiente",
        id_servicio: findServicio.id,
      });
      extras.forEach(async (extra) => {
        const addDetallePedido = await Detalle_pedido.create({
          id_pedido: createPedido.id,
          id_producto: extra.producto_id,
          cantidad: extra.cantidad,
        });
      });

      return res.json({
        ok: true,
        msg: "Pedido creado con exito",
      });
    } else {
      return res.json({
        ok: false,
        msg: "No se encontró el servicio",
      });
    }
  } catch (e) {
    return res.json({
      ok: false,
      msg: "No se encontró el servicio",
    });
  }
};

module.exports = {
  agregarPedido,
};
