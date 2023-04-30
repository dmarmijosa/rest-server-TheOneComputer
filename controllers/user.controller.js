const {response}= require('express')
const usuariosGet = (req, res= response) => {
  res.status(200).json({
    ok: true,
    msg: "Get Api",
  });
};



module.exports={
    usuariosGet
}