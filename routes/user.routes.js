const { Router } = require("express");
const { usuariosGet } = require("../controllers/user.controller");

const router = Router();
router.get("/",usuariosGet);

module.exports = router;
