const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/user.controller");
const { check } = require("express-validator");
// const { validarCampos } = require("../middlewares/validar-campos.middleware");
// const { esAdminRole,tieneRol } = require("../middlewares/validar-roles.middleware");
// const { validarJWT } = require("../middlewares/validar-jwt.middleware");
const {
  validarCampos,
  tieneRol,
  esAdminRole,
  validarJWT,
} = require("../middlewares");
const {
  esRoleValido,
  existeEmail,
  existeUsuarioID,
  esUnNumero,
} = require("../helpers/db-validators.helper");

const router = Router();
router.get(
  "/",
  [
    check("limite").custom(esUnNumero),
    check("desde").custom(esUnNumero),
    validarCampos,
  ],
  usuariosGet
);
router.post(
  "/",
  [
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeEmail),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe ser valida").isLength({ min: 6 }),
    //check("rol", "No es rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeUsuarioID),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
