const { response } = require('express');

const Cliente = require('../models/cliente');
const Habitacion = require('../models/habitacion');
const Estado = require('../models/estado');
const Tipo_pago = require('../models/tipo_pago');
const Producto = require('../models/producto');
const Pedido = require('../models/pedido');
const Promocion = require('../models/promocion');
const Servicio = require('../models/servicio');
const Servicio_promocion = require('../models/servicio_promocion');



const Inventario = require('../models/inventario');
const Producto = require('../models/producto');
const tipo_producto = require('../models/tipo_producto');



//habitaciones disponibles
//habitaciones ocupadas
//habitaciones en aseo


const estadoHabitaciones = async (req, res) => {
    
   
    try{
   
    const disponibles = await Estado.findAll({
        
        where:{
            estado: 'disponible'
        }           
    });
    const ocupadas = await Estado.findAll({
        
        where:{
            estado: 'ocupada'
        }           
    });
    const aseo = await Estado.findAll({
        
        where:{
            estado: 'aseo'
        }           
    });

    const disponible =  await disponibles.length;
    const ocupada =  await ocupadas.length;
    const asear =  await aseo.length;
    res.json({
        ok:true,
        msg: { "disponibles: ": disponible.length,
            "ocupadas":ocupada,
            "aseo":asear}
    });
    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo actualizar el cliente'
        });
    }

}


//pendientes pago

const pendientePago = async (req, res)=>{
    try{
        const servicioPendiente = await Servicio_promocion.findAll({
            where:{
                estado:'pendiente'
            },
            attributes:['id','id_servicio','estado']
        });
        const pedidoPendiente = await Pedido.findAll({
            where:{
                estado:'pendiente'
            },
            attributes:['id','id_servicio','estado']
        });

        if(servicioPendiente || pedidoPendiente){
            res.json({
                ok:true,
                msg: {servicioPendiente, pedidoPendiente}
            });
        }
        else{
            res.json({
                ok:true,
                msg: 'empty'
            });
        }
    }
    catch(e){
        res.json({
            ok:false,
            msg: 'error, contacte con el administrador'
        });
    }
}

//listado de habitaciones (tabla de habitaciones)

const Habitaciones = async (req, res) => {
   
    try{
    
    const getHabitaciones = await Habitacion.findAll({
        attributes:['numero'],
        include:[Estado],
        order:['numero']
    });

    
    res.json({
        ok:true,
        msg: { "number: ": disponible.length,
            "Estado":ocupada,
            "aseo":asear}
    });
    }
    catch(error){
        res.json({
            ok:false,
            msg: 'No se pudo actualizar el cliente'
        });
    }

}


//reservar habitacion
const reservarHabitacion = async (req, res) => {
    const { id,
        nombre1,
        apellido1,
        rut1,
        nombre2,
        apellido2,
        rut2,
        id_promocion,
        id_producto1,
        id_producto2, 
        pedido1,
        metodo_pago
          } = req.body;

    try{

        //consultar el estado
        const consultarEstado = await Habitacion.findOne({
            where:{
                id,
                id_estado:1
            }
        });
        //si el estado es disponible entonces registro el servicio
        if (consultarEstado){
            const newService = await Servicio.create({
                id_habitacion:id,
                id_promocion,
                id_usuario,
                id_turno,
                fecha,
                hr_entrada,
                hr_salida,
                total
            }); 

        }
        else{
            res.json({
                ok:false,
                msg: 'error, no se puede reservar esta habitación'
            });
        }



    }
    catch(e){
        res.json({
            ok:false,
            msg: 'error, contacte con el administrador'
        });
     }   


}


//cancelar reserva (aliminar en cascada )

//editar reserva
//habilitar habitacion

//hora termino

//desalojar habitacion (cambiar estado)


module.exports = {

 };