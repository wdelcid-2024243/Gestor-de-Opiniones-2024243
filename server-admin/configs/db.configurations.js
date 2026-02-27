import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI no está definida en el archivo .env");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);

  console.log("MongoDB conectado correctamente");
};