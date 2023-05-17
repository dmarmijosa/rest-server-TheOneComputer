const { response } = require("express");
const bcrypjs = require('bcryptjs');
const Usuario = require("../models/usuario.model");


const usuariosGet = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "Get Api",
  });
};

const usuariosPost = async (req, res = response) => {
  
  const { nombre,correo, password, rol } = req.body;
  const usuario = new Usuario({nombre,correo,password,rol});
  // Encriptar contraseña
  const salt = bcrypjs.genSaltSync(10);
  usuario.password = bcrypjs.hashSync(password, salt);
  // save users
  await usuario.save();
  res.json({
    ok:true,
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
};
