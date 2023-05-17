const { Router } = require("express");
const { usuariosGet, usuariosPost } = require("../controllers/user.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { esRoleValido, existeEmail } = require("../helpers/db-validators.helper");


const router = Router();
router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeEmail),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe ser valida").isLength({ min: 6 }),
    check("rol", "No es rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

module.exports = router;
