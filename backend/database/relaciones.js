const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const rol_usuario = require('../models/rol_usuario');
//const { FOREIGNKEYS } = require('sequelize/types/lib/query-types');


//m:n

Usuario.belongsToMany(Rol, {through: 'rol_usuario', foreignKey: 'usuarioId', onDelete: 'CASCADE'});
Rol.belongsToMany(Usuario,  {through: 'rol_usuario', foreignKey: 'rolId' , onDelete: 'CASCADE'});

//primitive m:n

// Usuario.hasMany(rol_usuario, {foreignKey: 'usuarioId', sourceKey: 'id'});
// rol_usuario.belongsTo(Usuario, {foreignKey: 'usuarioId', sourceKey: 'id'});

// Rol.hasMany(rol_usuario, {foreignKey: 'rolId', sourceKey: 'id'});
// rol_usuario.belongsTo(Rol, {foreignKey: 'rolId', sourceKey: 'id'});

 console.log('hello');