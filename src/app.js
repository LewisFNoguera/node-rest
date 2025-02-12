import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

import { notFound, errorHandlers } from "./middlewares.js";
import { router } from "./api/index.js";
import { connectDB } from "./db.js";

export const app = express();

const db = await connectDB(); // Espera la conexión antes de continuar
console.log("✅ Conexión exitosa a la base de datos:", db.databaseName);

// Rutas
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/api", router);

// Si se usan asi son generales: Middlewares
app.use(errorHandlers);
app.use(notFound);
