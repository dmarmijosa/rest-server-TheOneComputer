const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      ok: false,
      msg: "Se quiere verificar el rol sin validar el token",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol != "ADMIN_ROLE") {
    return res.status(401).json({
      ok: false,
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};
const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        ok: false,
        msg: "Se quiere verificar el rol sin validar el token",
      });
    }
    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            ok:false,
            msg:`Se requiere uno de los aiguientes roles ${roles}`
        })
    }

    next();
  };
};
module.exports = {
  esAdminRole,
  tieneRol,
};
