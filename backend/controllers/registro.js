const { response } = require("express");

const Registro = require("../models/registro");
const Usuario = require("../models/usuario");

const getRegistros = async (req, res = response) => {
  try {
    const allRegistros = await Registro.findAll({
      attributes: [
        'id', 'id_servicio', 'id_habitacion', 'fecha', 'fecha_entrada', 'monto', 'observacion'
      ],
      include: [{
        model: Usuario
      }],
      order: [['fecha', 'DESC']]
    });
    return res.json({
      ok: true,
      allRegistros,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      msg: "Error contacte a administrador",
    });
  }
};

module.exports = {
  getRegistros
};