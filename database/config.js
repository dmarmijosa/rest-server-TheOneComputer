const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, options);
    console.log("Base de datos en línea");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
