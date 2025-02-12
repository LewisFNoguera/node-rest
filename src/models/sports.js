import { connectDB } from "../db.js";

// Función para obtener la colección "sports"
export async function getSportsCollection() {
  const db = await connectDB();
  const collection = db.collection("sports")

  await collection.createIndex({ name: 1}, { unique: true })
  return collection;
}

// Función para validar un deporte antes de guardarlo
export function validateSport(sport) {
  if (!sport.name || typeof sport.name !== "string") {
    throw new Error("El nombre es obligatorio y debe ser un string.");
  }
  if (sport.playersPerTeam !== undefined && typeof sport.playersPerTeam !== "number") {
    throw new Error("playersPerTeam debe ser un número.");
  }
  return sport;
}
