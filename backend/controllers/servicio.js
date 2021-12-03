const { response } = require("express");
const sequelize = require("../database/database");

const Tipo_habitacion = require('../models/tipo_habitacion');
const Cliente = require("../models/cliente");
const Habitacion = require("../models/habitaciones");
const Estado = require("../models/estado");
const Pedido = require("../models/pedido");
const Promocion = require("../models/promocion");
const Servicio = require("../models/servicio");
const Servicio_promocion = require("../models/servicio_promociones");
const Detalle_pedido = require("../models/detalle_pedido");
const Servicio_promociones = require("../models/servicio_promociones");
const Inventario = require("../models/inventario");
const Producto = require("../models/producto");
const Balance_aux = require("../models/balance_aux");
const descInv = require("../helpers/desc-inv");

// Helpers
const cantidad_extras = require('../helpers/cantidad_extras');

//habitaciones disponibles
//habitaciones ocupadas
//habitaciones en aseo

const estadoHabitaciones = async (req, res) => {
    try {
        const disponibles = await Habitacion.findAll({
            where: {
                id_estado: 1
            },
        });
        const ocupadas = await Habitacion.findAll({
            where: {
                id_estado: 2
            },
        });
        const aseo = await Habitacion.findAll({
            where: {
                id_estado: 3
            },
        });

        const disponible = await disponibles.length;
        const ocupada = await ocupadas.length;
        const asear = await aseo.length;
        return res.json({
            ok: true,
            msg: {
                disponibles: disponible,
                ocupadas: ocupada,
                aseo: asear,
            },
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: "No se pudo actualizar el cliente",
        });
    }
};

//pendientes pago

const pendientePago = async (req, res) => {
    try {
        const servicioPendiente = await Servicio_promocion.findAll({
            where: {
                estado: "pendiente",
            },
            attributes: ["id", "id_servicio", "estado"],
        });
        const pedidoPendiente = await Pedido.findAll({
            where: {
                estado: "pendiente",
            },
            attributes: ["id", "id_servicio", "estado"],
        });

        if (servicioPendiente || pedidoPendiente) {
            res.json({
                ok: true,
                msg: { servicioPendiente, pedidoPendiente },
            });
        } else {
            res.json({
                ok: true,
                msg: "empty",
            });
        }
    }
    catch (e) {
        res.json({
            ok: false,
            msg: 'Ha ocurrido un error, por favor contacte al administrador'
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
            order: [
                ['numero', 'ASC']
            ]
        });
        let array_final = [];
        for (let habitacion of habitaciones) {
            let id_servicio = habitacion.servicios[0]?.id
            // Comprobamos si esta pagado dicho servicio
            if (id_servicio) {
                const registro_ServicioPromocion = await Servicio_promocion.findOne({
                    where: { id_servicio },
                    include: [{
                        model: Promocion,
                        attributes: [
                            'horas'
                        ],
                    }],
                });
                let h = habitaciones.find(habitacion => habitacion.servicios[0]?.id === id_servicio);
                h.dataValues.pagado = registro_ServicioPromocion.estado;
                h.dataValues.horas = registro_ServicioPromocion.promocione.horas;
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
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error, Hable con el administrador'
        });
    }
};

const habilitarHabitacion = async (req, res) => {
    try {
        const { id } = req.body;
        const habitacion = await Habitacion.findOne({
            where: { id }
        });
        if (habitacion.id_estado === 3) {
            habitacion.id_estado = 1;
            habitacion.save();
            return res.status(200).json({
                ok: true,
                msg: 'Habitacion habilitada correctamente'
            });
        }
        return res.status(200).json({
            ok: true,
            msg: 'La habitacion no esta en estado de aseo'
        });
    }
    catch (error) {
        return res.status(200).json({
            ok: false,
            msg: 'Error, Hable con el administrador'
        });
    }
};

const reservarHabitacion = async (req, res) => {
    try {
        const { id, clientes, servicios, extras, metodo_de_pago } = req.body;
        // Consultar el estado
        const consultarEstado = await Habitacion.findOne({
            where: {
                id,
                id_estado: 1,
            },
        });

        // En caso de algun error estas variables se modifican y se envian al cliente
        let error = false;
        let msg;

        // Si el estado es disponible entonces registro el cliente
        if (consultarEstado) {
            const arreglo = [];

            for (let cliente of clientes) {
                const findClient = await Cliente.findOne({
                    where: {
                        rut: cliente.rut,
                    },
                    attributes: ["id", "nombre", "apellido", "rut"],
                });

                if (!findClient) {
                    const createCliente = await Cliente.create(
                        {
                            nombre: cliente.nombre,
                            apellido: cliente.apellido,
                            rut: cliente.rut,
                        },
                        {
                            fields: ["nombre", "apellido", "rut"],
                            attributes: ["id"],
                        }
                    );
                    const client = createCliente.id;
                    arreglo.push(client);
                } else {
                    const client = findClient.id;
                    arreglo.push(client);
                }
            } // end for

            const newService = await Servicio.create({
                id_habitacion: id,
                fecha: sequelize.literal("CURRENT_DATE"),
                hr_entrada: sequelize.literal("CURRENT_TIME"),
                total: 0,
                id_cliente1: arreglo[0], //deberia tener los id de el arreglo
                id_cliente2: arreglo[1],
            });

            // Agregar servicio
            servicios.forEach(async (service) => {
                const findPromocion = await Promocion.findOne({
                    where: {
                        id: service.id_promocion,
                    },
                });
                console.log(findPromocion);

                if (findPromocion) {
                    
                    //consultar stock del producto
                   

                    const addPromo = await Servicio_promocion.create({
                        id_promocion: service.id_promocion,
                        id_servicio: newService.id,
                        id_tipo_pago: metodo_de_pago,
                        //id_producto1: service.id_producto1,
                        id_producto1: service.id_productos[0],
                        id_producto2: service.id_productos[1],
                        //id_producto2: service.id_producto2,
                        estado: false,
                    });
                    // Descontamos los productos de inventario
                    descInv(service.id_productos[0], 1);
                    descInv(service.id_productos[1], 1);
                    // Agregamos la venta en tabla balance_aux
                    const balance_aux = await Balance_aux.findOne({
                        where: { id: 1 }
                    });
                    balance_aux.ventas += findPromocion.precio;
                    balance_aux.save();
                } else {
                    return res.json({
                        ok: false,
                        msg: "Servicio no existe",
                    });
                }
            });

            // Agrego los extras si existen tabla pedidos y producto pedido
            if (extras) {
                const objCantidadExtras = cantidad_extras(extras);
                // [
                //     { id_producto: '1', cantidad: 1 },
                //     { id_producto: '2', cantidad: 1 },
                //     { id_producto: '3', cantidad: 1 },
                //     { id_producto: '4', cantidad: 1 }
                // ]
                const addPedido = await Pedido.create({
                    id_servicio: newService.id,
                    id_tipo_pago: metodo_de_pago,
                    estado: "pendiente",
                    //total
                });
                for (let extra of objCantidadExtras) {
                    await Detalle_pedido.create({
                        id_pedido: addPedido.id,
                        id_producto: extra.id_producto,
                        cantidad: extra.cantidad,
                    });
                    // Agregamos precio de cada producto a ventas en balance_aux
                    const producto = await Producto.findOne({
                        where: {
                            id: extra.id_producto
                        }
                    });
                    // Descontamos de inventario
                    const resp = await descInv(extra.id_producto, extra.cantidad);
                    if (!resp) {
                        error = true
                        msg = `El producto ${producto.nombre} no tiene stock suficiente`;
                        break;
                    }
                    const balance_aux = await Balance_aux.findOne({
                        where: {
                            id: 1
                        }
                    });
                    balance_aux.ventas += producto.precio * extra.cantidad;
                    balance_aux.save();
                };
            }

            // Cambiar estado de la habitacion a ocupada
            await Habitacion.update(
                {
                    id_estado: 2,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return res.status(200).json({
                ok: error ? false : true,
                msg: error ? msg : "Habitacion reservada",
            });
        } else {
            return res.json({
                ok: false,
                msg: "Error, la habitación no está disponible",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            ok: false,
            msg: "Ha ocurrido un error, por favor contacte al administrador",
        });
    }
};

//cancelar reserva (aliminar en cascada)
const cancelarReserva = async (req, res) => {
    try {
        const { id_servicio } = req.body;
        const servicio = await Servicio.findOne({
            where: { id: id_servicio },
            attributes: ['id', 'id_habitacion']
        });
        // if (findService) {

        //     //actualizar 



        //     const updateHabitacion = await Habitacion.update({
        //         id_estado: 1
        //     },
        //         {
        //             where: {
        //                 id: findService.id_habitacion
        //             }
        //         });

        //     const deleteService = await Servicio.destroy({
        //         where: {
        //             id: findService.id,
        //         },
        //     });

        //     return res.json({
        //         ok: true,
        //         msg: "Reserva cancelada",
        //     });
        // } else {
        //     res.json({
        if (!servicio) {
            return res.status(200).json({
                ok: false,
                msg: 'No existe el servicio'
            });
        }
        // Quitar todo respecto a servicio_promociones (registros y ventas)
        const servicio_promociones = await Servicio_promocion.findAll({
            where: { id_servicio: servicio.id }
        });
        servicio_promociones.forEach(async servicio_promocion => {
            // Quitar de ventas el precio respectivo
            const promocion = await Promocion.findOne({
                where: { id: servicio_promocion.id_promocion }
            });
            const balance = await Balance_aux.findOne({
                where: { id: 1 }
            });
            balance.ventas -= promocion.precio;
            balance.save();
            // Eliminamos el registro de tabla servicio_promocion
            servicio_promocion.destroy();
        });
        servicio.destroy();
        return res.status(200).json({
            ok: true,
            msg: 'Habitacion cancelada'
        });
    } catch (e) {
        res.json({
            ok: false,
            msg: "Ha ocurrido un error, por favor contacte al administrador",
        });
    }
};

//editar reserva

//habilitar habitacion

//hora termino

//desalojar habitacion (cambiar estado)
const desalojarHabitacion = async (req, res) => {
    const { id } = req.body;
    try {
        const findService = await Servicio.findOne({
            where: {
                id,
            },
            attributes: ["id", "hr_salida", 'id_habitacion'],
        });
        console.log(findService)
        if (!findService.hr_salida) {

            const serSalida = await Servicio.update(
                {
                    hr_salida: sequelize.literal("CURRENT_TIME")
                },
                {
                    fields: ["hr_salida"],
                    where: { id },
                    attributes: ["id", "id_habitacion"],
                }
            );
            //console.log(findService.id_habitacion);
            const setEstado = await Habitacion.update(
                {
                    id_estado: 3
                },
                {
                    fields: ["id_estado"],
                    where: { id: findService.id_habitacion },
                    attributes: ["id"],
                }
            );
            //cambiar estado a aseo
            console.log("se cambio el estado");
            //al desalojar hay que cambiar los valores de

            return res.json({
                ok: true,
                msg: "Habitacion desalojada",
            });
        }
        else {
            res.json({
                ok: false,
                msg: 'habitacion ya esta desalojada'
            })
        }
    } catch (e) {
        res.json({
            ok: false,
            msg: "Ha ocurrido un error, por favor contacte al administrador",
        });
    }
};

const listarPromociones = async (req, res = response) => {
    try {
        const promociones = await Promocion.findAll();
        return res.json({
            ok: false,
            msg: promociones,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: "Ha ocurrido un error, por favor contacte al administrador",
        });
    }
};

const calcularTotalServicio = async (req, res) => {
    const { id } = req.body;
    try {

    }
    catch (e) {
        res.json({
            ok: false,
            msg: "Ha ocurrido un error, por favor contacte al administrador",
        });
    }
};
// const desalojarHabitacion = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const findService = await Servicio.findOne({
//       where: {
//         id,
//       },
//       attributes: ["id", "id_habitacion", "hr_salida"],
//     });

//     if (!findService.hr_salida) {
//     //   const findPedidoImpago = await Pedido.findAll({
//     //     where: {
//     //       id_servicio: id,
//     //       estado: "pendiente",
//     //     },
//     //     attributes: ["id", "estado"],
//     //   });

//     //   const findImpago = await Servicio_promocion.findAll({
//     //     where: {
//     //       id_servicio: id,
//     //       estado: false,
//     //     },
//     //     attributes: ["id", "estado"],
//     //   });
//     //   console.log(findImpago);
//     //   console.log(findPedidoImpago.dataValues.estado);
//       // if (findPedidoImpago.dataValues.estado === 'pendiente' || findImpago.dataValues.estado === false) {
//       //     console.log('paga la wea');
//       //     res.json({
//       //         ok: false,
//       //         msg: 'Pieza presenta impagos',
//       //         findService,
//       //         findImpago
//       //     });

//       // }
//       // else {
//     }
//   } catch (e) {
//     res.json({
//       ok: false,
//       msg: "Ha ocurrido un error, por favor contacte al administrador",
//     });
//   }
// };

//cambiar estado pago

//funcion para descontar productos de inventario
// export const consulProd = async (id) => {
//     const stockProduct = await Inventario.findOne({
//         where: {
//             id_producto:id,
            
//         },
//         attributes: [
//             'cantidad'
//         ]
//     });

//     if(stockProduct.cantidad>0){
//         stockProduct.cantidad-= 1;
//         stockProduct.save();
//     }

//     else{
//         return res.json({
//             ok:false,
//             msg: 'Producto sin stock en inventario' 
//         });
//     }

//     return stockProduct;
// };


//si hay stock eliminarlo de inventario


const getServicio = async (req, res = response ) => {
    try{
        const {id} = req.body;

        const findService = await Servicio.findOne({
            where:{
                id
            },
            attributes:['id_habitacion','id_cliente1', 'id_cliente2'],
            include:[
                Promocion,
                {
                model: Pedido,
                include:[Producto]
            }]
        });

        if(findService){
            //datos cliente
            const findCliente1 = await Cliente.findOne({
                where:{
                    id:findService.id_cliente1
                }
            });
            const findCliente2 = await Cliente.findOne({
                where:{
                    id:findService.id_cliente2
                }
            });

            const cliente1= findCliente1;
            const cliente2= findCliente2;

            
            return res.json({
                ok:true,
                findService,
                cliente1,
                cliente2
                
            });
        }
        else{
            return res.json({
                ok:false,
                msg:'No se encontro el servicio'
            });
        }
               
    }
    catch(e){
        return res.json({
            ok:false,
            msg:'Error, contacte con administración'
        });
    }
};

module.exports = {
    listarHabitaciones,
    habilitarHabitacion,
    estadoHabitaciones,
    reservarHabitacion,
    estadoHabitaciones,
    cancelarReserva,
    desalojarHabitacion,
    listarPromociones,
    getServicio,
};