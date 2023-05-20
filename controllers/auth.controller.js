const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/usuario.model");
const { generarJWT } = require("../helpers/generarJWT.helper");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    // Verificar si el correo y contraseña existen
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos.",
      });
    }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos.",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe.",
      });
    }
    //generar JWT
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal en el servidor",
    });
  }
};

module.exports = {
  login,
};
