const Bodega = require('../models/bodega');
const Cliente = require('../models/cliente');
const Detalle_pedido = require('../models/detalle_pedido');
const Estado = require('../models/estado');
const Habitacion = require('../models/habitaciones');
const Incidente = require('../models/incidente');
const Inventario = require('../models/inventario');
const Lista_negra = require('../models/lista_negra');
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');
const Promocion = require('../models/promocion');
const Rol = require('../models/rol');
const Servicio = require('../models/servicio');
const Servicio_promociones = require('../models/servicio_promociones');
const Tipo_habitacion = require('../models/tipo_habitacion');
const Tipo_pago = require('../models/tipo_pago');
const tipo_producto = require('../models/tipo_producto');
const Usuario = require('../models/usuario');


//const { FOREIGNKEYS } = require('sequelize/types/lib/query-types');

//1:n
 Cliente.hasMany(Lista_negra, {foreignKey: 'id_cliente', sourceKey: 'id',onDelete: 'CASCADE'});
 Lista_negra.belongsTo(Cliente, {foreignKey: 'id_cliente', sourceKey: 'id', onDelete: 'CASCADE'});


tipo_producto.hasMany(Producto, {foreignKey: 'id_tipo', sourceKey: 'id',onDelete: 'CASCADE'});
Producto.belongsTo(tipo_producto, {foreignKey: 'id_tipo', sourceKey: 'id', onDelete: 'CASCADE'});

Servicio.hasMany(Incidente, {foreignKey: 'id_servicio', sourceKey: 'id',onDelete: 'CASCADE'});
Incidente.belongsTo(Servicio, {foreignKey: 'id_servicio', sourceKey: 'id', onDelete: 'CASCADE'});

Tipo_pago.hasMany(Servicio_promociones, {foreignKey: 'id_tipo_pago', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio_promociones.belongsTo(Tipo_pago, {foreignKey: 'id_tipo_pago', sourceKey: 'id', onDelete: 'CASCADE'});

Producto.hasMany(Servicio_promociones, {foreignKey: 'id_producto1', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio_promociones.belongsTo(Producto, {foreignKey: 'id_producto1', sourceKey: 'id', onDelete: 'CASCADE'});

Producto.hasMany(Servicio_promociones, {foreignKey: 'id_producto2', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio_promociones.belongsTo(Producto, {foreignKey: 'id_producto2', sourceKey: 'id', onDelete: 'CASCADE'});

Habitacion.hasMany(Servicio, {foreignKey: 'id_habitacion', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio.belongsTo(Habitacion, {foreignKey: 'id_habitacion', sourceKey: 'id', onDelete: 'CASCADE'});

Estado.hasMany(Habitacion, {foreignKey: 'id_estado', sourceKey: 'id',onDelete: 'CASCADE'});
Habitacion.belongsTo(Estado, {foreignKey: 'id_estado', sourceKey: 'id', onDelete: 'CASCADE'});

Tipo_habitacion.hasMany(Habitacion, {foreignKey: 'id_tipo', sourceKey: 'id',onDelete: 'CASCADE'});
Habitacion.belongsTo(Tipo_habitacion, {foreignKey: 'id_tipo', sourceKey: 'id', onDelete: 'CASCADE'});

Servicio.hasMany(Pedido, {foreignKey: 'id_servicio', sourceKey: 'id',onDelete: 'CASCADE'});
Pedido.belongsTo(Servicio, {foreignKey: 'id_servicio', sourceKey: 'id', onDelete: 'CASCADE'});

Tipo_pago.hasMany(Pedido, {foreignKey: 'id_tipo_pago', sourceKey: 'id',onDelete: 'CASCADE'});
Pedido.belongsTo(Tipo_pago, {foreignKey: 'id_tipo_pago', sourceKey: 'id', onDelete: 'CASCADE'});

Cliente.hasMany(Servicio, {foreignKey: 'id_cliente1', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio.belongsTo(Cliente, {foreignKey: 'id_cliente1', sourceKey: 'id', onDelete: 'CASCADE'});

Cliente.hasMany(Servicio, {foreignKey: 'id_cliente2', sourceKey: 'id',onDelete: 'CASCADE'});
Servicio.belongsTo(Cliente, {foreignKey: 'id_cliente2', sourceKey: 'id', onDelete: 'CASCADE'});


//1:1
Producto.hasOne(Bodega, {foreignKey: 'id_producto', sourceKey: 'id',onDelete: 'CASCADE'});
Bodega.belongsTo(Producto, {foreignKey: 'id_producto', sourceKey: 'id', onDelete: 'CASCADE'});

Producto.hasOne(Inventario, {foreignKey: 'id_producto', sourceKey: 'id',onDelete: 'CASCADE'});
Inventario.belongsTo(Producto, {foreignKey: 'id_producto', sourceKey: 'id', onDelete: 'CASCADE'});



//m:n

Usuario.belongsToMany(Rol, {through: 'rol_usuario', foreignKey: 'usuarioId', onDelete: 'CASCADE'});
Rol.belongsToMany(Usuario,  {through: 'rol_usuario', foreignKey: 'rolId' , onDelete: 'CASCADE'});

Servicio.belongsToMany(Promocion, {through: 'servicio_promociones', foreignKey: 'id_servicio', onDelete: 'CASCADE'});
Promocion.belongsToMany(Servicio,  {through: 'servicio_promociones', foreignKey: 'id_promocion' , onDelete: 'CASCADE'});

Pedido.belongsToMany(Producto, {through: 'detalle_pedido', foreignKey: 'id_pedido', onDelete: 'CASCADE'});
Producto.belongsToMany(Pedido,  {through: 'detalle_pedido', foreignKey: 'id_producto' , onDelete: 'CASCADE'});



//primitive m:n

// Usuario.hasMany(rol_usuario, {foreignKey: 'usuarioId', sourceKey: 'id'});
// rol_usuario.belongsTo(Usuario, {foreignKey: 'usuarioId', sourceKey: 'id'});

// Rol.hasMany(rol_usuario, {foreignKey: 'rolId', sourceKey: 'id'});
// rol_usuario.belongsTo(Rol, {foreignKey: 'rolId', sourceKey: 'id'});

 console.log('hello');