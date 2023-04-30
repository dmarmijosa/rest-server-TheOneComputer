const express = require("express");
const cors = require('cors');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath='/api/usuarios'
    // Middelwares
    this.middlewares();
    this.routes();
  }
  middlewares(){
    //Directorio publico
    this.app.use(express.static('public'))
  }
  routes() {
    this.app.use(this.usuariosPath,require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = {
  Server,
};
