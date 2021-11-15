const { response } = require('express');

const Bodega = require('../models/bodega');
const Producto = require('../models/producto');
const Tipo_producto = require('../models/tipo_producto');

const getBodega = async (req, res = response) => {
    try {
        const findAllProducts = await Producto.findAll({
            attributes: [
                'id',
                'nombre',
                'precio',
            ],
            include: [{
                model: Tipo_producto,
                attributes: [
                    'tipo'
                ]
            }, {
                model: Bodega,
                attributes: [
                    'cantidad'
                ],
            }]
        });
        return res.status(200).json({
            ok: true,
            msg: findAllProducts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const crearProductoBodega = async (req, res = response) => {
    try {
        const { nombre, precio, id_tipo, cantidad, cantidad_minima } = req.body;

        // Si el producto no existe lo debemos crear
        const verificarProducto = await Producto.findOne({
            where: { nombre: nombre }
        });

        // no existe, debemos agregarlo
        if (!verificarProducto) {
            const newProducto = await Producto.create({
                nombre,
                precio,
                id_tipo,
            });
            console.log(newProducto);
            // Ahora lo creamos en bodega
            await Bodega.create({
                id_producto: newProducto.dataValues.id,
                cantidad,
                cantidad_minima
            });
            return res.status(200).json({
                ok: true,
                msg: 'Creado en productos y bodega correctamente'
            });
        }

        // ya existe, solo debemos actualizarlo en bodega
        const producto = await Producto.findOne({
            where: { nombre }
        });
        const productoBodega = await Bodega.findOne({
            where: { id_producto: producto.dataValues.id }
        });
        productoBodega.cantidad = cantidad;
        productoBodega.save();

        return res.status(200).json({
            ok: true,
            msg: 'Producto actualizado en bodega correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    getBodega,
    crearProductoBodega
};