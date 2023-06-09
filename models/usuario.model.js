const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});
usuarioSchema.methods.toJSON=function(){
  const { password, __v, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}
module.exports = model("Usuario", usuarioSchema);
