const Role = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya ha sido registrado`)
  }
};

module.exports = {
  esRoleValido,
  existeEmail
};
