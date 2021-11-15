const { response } = require('express');

const Cliente = require('../models/cliente');
const Habitacion = require('../models/habitaciones');
const Estado = require('../models/estado');
const Pedido = require('../models/pedido');
const Promocion = require('../models/promocion');
const Servicio = require('../models/servicio');
const Servicio_promocion = require('../models/servicio_promociones');
const Detalle_pedido = require('../models/detalle_pedido');
const Tipo_habitacion = require('../models/tipo_habitacion');



//habitaciones disponibles
//habitaciones ocupadas
//habitaciones en aseo


const estadoHabitaciones = async (req, res) => {


    try {

        const disponibles = await Estado.findAll({

            where: {
                estado: 'disponible'
            }
        });
        const ocupadas = await Estado.findAll({

            where: {
                estado: 'ocupada'
            }
        });
        const aseo = await Estado.findAll({

            where: {
                estado: 'aseo'
            }
        });

        const disponible = await disponibles.length;
        const ocupada = await ocupadas.length;
        const asear = await aseo.length;
        res.json({
            ok: true,
            msg: {
                "disponibles: ": disponible.length,
                "ocupadas": ocupada,
                "aseo": asear
            }
        });
    }
    catch (error) {
        res.json({
            ok: false,
            msg: 'No se pudo actualizar el cliente'
        });
    }

}


//pendientes pago

const pendientePago = async (req, res) => {
    try {
        const servicioPendiente = await Servicio_promocion.findAll({
            where: {
                estado: 'pendiente'
            },
            attributes: ['id', 'id_servicio', 'estado']
        });
        const pedidoPendiente = await Pedido.findAll({
            where: {
                estado: 'pendiente'
            },
            attributes: ['id', 'id_servicio', 'estado']
        });

        if (servicioPendiente || pedidoPendiente) {
            res.json({
                ok: true,
                msg: { servicioPendiente, pedidoPendiente }
            });
        }
        else {
            res.json({
                ok: true,
                msg: 'empty'
            });
        }
    }
    catch (e) {
        res.json({
            ok: false,
            msg: 'error, contacte con el administrador'
        });
    }
};

const listarHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.findAll({
            attributes: [
                'numero'
            ],
            include: [{
                model: Estado,
                attributes: [
                    'id'
                ],
            }, {
                model: Tipo_habitacion,
                attributes: [
                    'id'
                ]
            }, {
                model: Servicio,
                attributes: [
                    'id',
                    'hr_entrada',
                    'hr_salida'
                ]
            }],
        });
        let array_final = [];
        for (let habitacion of habitaciones) {
            let id_servicio = habitacion.servicios[0]?.id
            // Comprobamos si esta pagado dicho servicio
            if (id_servicio) {
                const registro_ServicioPromocion = await Servicio_promocion.findOne({
                    where: { id_servicio }
                });
                let h = habitaciones.find(habitacion => habitacion.servicios[0]?.id === id_servicio);
                h.dataValues.pagado = registro_ServicioPromocion.estado;
                array_final.push(h.dataValues);
            }
            else {
                array_final.push(habitacion);
            }
        };
        return res.status(200).json({
            ok: true,
            listaHabitaciones: array_final
        });
    }
    catch (error) {
        res.json({
            ok: false,
            msg: 'Error, Hable con el administrador'
        });
    }
};

<<<<<<< HEAD
=======

//reservar habitacion
>>>>>>> 3de2fadfa5e20a29ba18c978c33a3e87f429a96b
const reservarHabitacion = async (req, res) => {
    const { id,
        clientes,
        servicios,
        extras,
        metodo_de_pago
    } = req.body;

    try {

        //consultar el estado
        const consultarEstado = await Habitacion.findOne({
            where: {
                id,
                id_estado: 1
            }

        });
        //si el estado es disponible entonces registro el cliente
        if (consultarEstado) {
            const arreglo = [];
            clientes.forEach(async (cliente) => {

                const findClient = await Cliente.findOne({
                    where: {
                        rut: cliente.rut
                    },
                    attributes: [
                        'id', 'nombre', 'apellido', 'rut'
                    ]
                });

                if (!findClient) {
                    const createCliente = await Cliente.create({
                        nombre: cliente.nombre,
                        apellido: cliente.apellido,
                        rut: cliente.rut,
                    }, {
                        fields: ['nombre', 'apellido', 'rut'],
                        attributes: ['id']

                    });
                    const caca = await createClient.id;
                    arreglo.push(caca);
                    console.log(JSON.stringify(createClient.id));
                }

                else {
                    const mierda = await findClient.id;
                    arreglo.push(mierda);
                    console.log(mierda);
                }
            });
            console.log(arreglo);

            const newService = await Servicio.create({
                id_habitacion: id,
                //id_usuario1,
                //id_turno,
                //fecha: Sequelize.literal('CURRENT_TIMESTAMP'),
                //hr_entrada,
                //hr_salida,
                total: 0,
                id_cliente1: 4,//deberia tener los id de el arreglo
                id_cliente2: 5
            });


            //agregar servicio


            servicios.forEach(async (service) => {

                const findPromocion = await Promocion.findOne({
                    where: {
                        id: service.id_promocion
                    }
                });

                if (findPromocion) {
                    //consultar stock del producto
                    const addPromo = Servicio_promocion.create({
                        id_promocion: service.id_promocion,
                        id_servicio: newService.id,
                        id_tipo_pago: metodo_de_pago,
                        id_producto1: service.id_producto1,
                        id_producto2: service.id_producto2,
                        estado: false
                    });
                }
                else {
                    res.json({
                        ok: false,
                        msg: 'Servicio no existe'
                    });
                }
            });


            //agrego los extras si existen tabla pedidos y producto pedido

            if (extras) {

                const addPedido = await Pedido.create({
                    id_tipo_pago: metodo_de_pago,
                    estado: 'pendiente',
                    id_servicio: newService.id,
                    //total

                });

                //rellenar la tabla producto pedido for each
                extras.forEach(async (extra) => {

                    const addDetallePedido = await Detalle_pedido.create({
                        id_pedido: addPedido.id,
                        id_producto: extra.producto_id,
                        cantidad: extra.cantidad,
                    });

                });
            }

            //cambiar estado de la habitacion a ocupada
            const Ocupada = await Habitacion.update({
                id_estado: 2


            },
                {
                    where: {
                        id
                    }
                }
            );
            res.json("Habitacion reservada")

        }

        else {
            res.json({
                ok: false,
                msg: 'error, no se puede reservar esta habitación'
            });
        }



    }
    catch (e) {
        res.json({
            ok: false,
            msg: 'error, contacte con el administrador'
        });
    }


}


//cancelar reserva (aliminar en cascada )

// const cancelarReserva = async (req, res) => {
//     const { id,
//         clientes,
//         servicios,
//         extras,
//         metodo_de_pago
//     } = req.body;



//editar reserva
//habilitar habitacion

//hora termino

//desalojar habitacion (cambiar estado)


module.exports = {
    listarHabitaciones,
    reservarHabitacion,
    estadoHabitaciones
};