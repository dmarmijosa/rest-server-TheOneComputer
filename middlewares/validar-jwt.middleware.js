const { response, request } = require("express");
const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Falta el token en la petición",
    });
  }
  try {
    const {uid} = jwt.verify(token,process.env.KEY)
    const usuario = await Usuario.findById(uid);
    if(!usuario){
      return res.status(401).json({
        ok:false,
        msg:'Usuario no existente'
      })
    }

    if(!usuario.estado){
      return res.status(401).json({
        ok:false,
        msg:'Usuario desactivado'
      })
    }
    req.usuario = usuario;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

};

module.exports = {
  validarJWT,
};
