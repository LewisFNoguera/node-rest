import { ObjectId } from "mongodb";
import { getSportsCollection, validateSport } from "../models/sports.js";

const collectionSport = await getSportsCollection();

export const getAll = async () => {
  return await collectionSport.find().toArray();
};

export const insertOne = async (req) => {
  const sport = validateSport(req);
  const result = await collectionSport.insertOne(sport);
  return result;
};

export const updateOne = async (id, updatedData) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es válido.");
  }

  const updateQuery = {
    $set: updatedData, // Solo actualiza los campos proporcionados
  };

  const result = await collectionSport.findOneAndUpdate(
    { _id: new ObjectId(id) }, // Filtra por el ID del documento
    updateQuery,
    { returnDocument: "after" } // Devuelve el valor actualizado
  );

  if (result.matchedCount === 0) {
    throw new Error("No se encontró ningún sport con ese ID.");
  }

  return result;
};

export const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es válido.");
  }

  const result = collection.deleteOne({ _id: new ObjectId(id) });
  if (result.matchedCount === 0) {
    throw new Error("No se encontró ningún sport con ese ID.");
  }

  return result;
};
