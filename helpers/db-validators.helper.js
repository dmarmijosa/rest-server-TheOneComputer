const Role = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const esRoleValido = async (rol) => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol: ${rol} no está registrado en la BD`);
  }
};

const existeEmail = async (correo) => {
  const email = await Usuario.findOne({ correo });
  if (email) {
    throw new Error(`El correo: ${correo} ya ha sido registrado`);
  }
};
const existeUsuarioID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
};
const esUnNumero = (value) => {
  if (isNaN(value) || parseInt(value) < 0) {
    throw new Error("El valor debe ser un número mayor a 0");
  }
  return true;
};


module.exports = {
  esRoleValido,
  existeEmail,
  existeUsuarioID,
  esUnNumero
};
