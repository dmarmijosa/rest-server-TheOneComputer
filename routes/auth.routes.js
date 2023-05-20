const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio y valido").notEmpty().isEmail(),
    check("password", "La contraseña es obligatoria y valida")
      .notEmpty()
      .isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

module.exports = router;
