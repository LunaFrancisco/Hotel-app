const { response } = require('express');
const { Field } = require('pg-protocol/dist/messages');
const Producto = require('../models/producto');
const tipo_producto = require('../models/tipo_producto');


const crearProducto = async (req, res) => {
    try{
        const { product, price, category } = req.body;

    //busco si esta el producto
    const findProduct = await Producto.findOne({
        where:{
            nombre:product
        },
        attributes: ['id']
    });
    let findCategory = await tipo_producto.findOne({
        where:{
            tipo:category
        },
        attributes: ['id']
    });
    
  
        if (!findCategory){
            const createCategory = await tipo_producto.create({
                    tipo:category
                },{
                    fields: ['tipo'],
                    attributes: ['id']
                
            });
             findCategory = createCategory;
            console.log('la categoria es: ', findCategory.id);
        }

        if(findProduct){
            res.json({
                ok:false,
                msg: 'El producto ya existe, pruebe con otro nombre'
            });
        }
        else{
            //creo el producto
            const createProduct = await Producto.create({
                nombre:product,
                precio:price,
                id_tipo: findCategory.id
                
            },{
                fields:['nombre','precio', 'id_tipo']
            }
            );
            res.json({
                ok:true,
                msg: 'Producto creado con exito'
            });
        }

    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo crear el producto'
        });
    }

}

const findAllProductos = async (req, res) => {
    try{

    //busco si esta el producto
    const findAllProducts = await Producto.findAll({
        attributes:[
            'nombre','precio',
        ],
        include:[tipo_producto]
    });
    

    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo crear el producto'
        });
    }

}

const consultarProducto = async (req, res) => {
    try{
        const { id } = req.body;

    //busco si esta el producto
    const findProduct = await Producto.findOne({
        where:{
            id
        },
    });
    

    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo crear el producto'
        });
    }

}

module.exports = {
   crearProducto,
   findAllProductos,
    consultarProducto,
//    eliminarProducto,
//    actualizarProducto
};