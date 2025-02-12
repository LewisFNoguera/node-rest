import { connectDB } from "../db.js";
import { ObjectId } from "mongodb"; // Para manejar referencias a `Sport`

export async function getAthletesCollection() {
  const db = await connectDB();
  const collection = db.collection("athletes"); // Accede a la colección "athletes"
  return collection;
}

// Función para validar un atleta antes de guardarlo
export function validateAthlete(athlete) {
  if (!athlete.firstName || typeof athlete.firstName !== "string") {
    throw new Error("El primer nombre es obligatorio y debe ser un string.");
  }
  if (!athlete.lastName || typeof athlete.lastName !== "string") {
    throw new Error("El apellido es obligatorio y debe ser un string.");
  }
  if (athlete.birthdate && isNaN(Date.parse(athlete.birthdate))) {
    throw new Error("La fecha de nacimiento debe ser una fecha válida.");
  }
  if (athlete.retired !== undefined && typeof athlete.retired !== "boolean") {
    throw new Error("El campo retired debe ser booleano.");
  }
  if (!Array.isArray(athlete.sports)) {
    throw new Error("El campo sports debe ser un array de ObjectId.");
  }

  // Convertir los `sports` a ObjectId
  athlete.sports = athlete.sports.map(id => new ObjectId(id));

  return athlete;
}
