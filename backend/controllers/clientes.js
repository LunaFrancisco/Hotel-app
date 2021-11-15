const { response } = require('express');
const Cliente = require('../models/cliente');




const crearCliente = async (req, res) => {
    try{
        const { nombre, apellido, rut } = req.body;

    //busco si esta registrado a traves de la funcion findClient
    const findclient = await Cliente.findOne({
        where: {
            rut
        },
        attributes: [
            'id', 'nombre', 'apellido', 'rut'
        ]
    });
        if (!findclient){
            const createCliente = await Cliente.create({
                    nombre,
                    apellido,
                    rut,
                },{
                    fields: ['nombre','apellido','rut'],
                    attributes: ['id']
                
            });

            res.json({
                ok:true,
                msg: 'Cliente registrado con exito'
            });
        }
        else{
            res.json({
                ok:true,
                msg: 'Cliente ya esta registrado',
                findclient
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

const actualizarCliente = async (req, res) => {
    
   
    try{
     const { id, nombre, apellido, rut } = req.body;
    //  const client = await findClient(rut) ;
    const actualizar = await Cliente.update({
        nombre,
        apellido,
        rut
    },{
        where:{
            id
        },
         fields:['nombre','apellido','rut']            
    }
    
    );
    res.json({
        ok:true,
        msg: 'Cliente actualizado con exito'
    });
    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo actualizar el cliente'
        });
    }

}



module.exports = {
crearCliente,
actualizarCliente,
};