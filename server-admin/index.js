import { config } from "dotenv";
config();

import app from "./src/index.js";
import { connectDB } from "./configs/db.configurations.js";

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

bootstrap();