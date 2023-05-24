const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    //Conexion a la base de datos
    this.comectarDB();
    // Middelwares
    this.middlewares();
    //rutas
    this.routes();
  }

  async comectarDB() {
    await dbConnection();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.usuariosPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("El servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = {
  Server,
};
