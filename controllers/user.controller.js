const { response } = require("express");
const bcrypjs = require("bcryptjs");
const Usuario = require("../models/usuario.model");

const usuariosGet = async (req, res = response) => {
  const { limite = "5", desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query).skip(desde).limit(limite);
  // const total = await Usuario.countDocuments(query);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.status(200).json({
    ok: true,
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  // Encriptar contraseña
  const salt = bcrypjs.genSaltSync(10);
  usuario.password = bcrypjs.hashSync(password, salt);
  // save users
  await usuario.save();
  res.status(201).json({
    ok: true,
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...resto } = req.body;
  if (password) {
    const salt = bcrypjs.genSaltSync(10);
    resto.password = bcrypjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
  res.status(202).json({
    ok: true,
    usuario,
  });
};
const usuariosDelete = async (req, resp = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  resp.status(200).json({
    ok: true,
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
