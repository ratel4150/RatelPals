import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prueba:1@cluster0.buo0t.mongodb.net/taxiApp?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    throw error;
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada");
  } catch (error) {
    console.error("Error cerrando la conexión a la base de datos:", error);
  }
};