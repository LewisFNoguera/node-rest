import { config as configDotenv } from "dotenv";
import { app } from "./app.js";

configDotenv();
const PORT = process.env.PORT || 3000;

(async () => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})();
