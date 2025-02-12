import { ObjectId } from "mongodb";
import { getAthletesCollection, validateAthlete } from "../models/athletes.js";

const athleteCollection = await getAthletesCollection();

export const getAll = async () => {
  return await athleteCollection
    .aggregate([
      {
        $lookup: {
          from: "sports",
          localField: "sports", // Campo en `athletes`
          foreignField: "_id", // Campo en `sports`
          as: "sports", // Alias para los datos
        },
      },
    ])
    .toArray();
};

export const getOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es válido.");
  }

  return await athleteCollection
    .aggregate([
      {
        $match: { _id: new ObjectId(id) }, // Filtrar por ID específico
      },
      {
        $lookup: {
          from: "sports",
          localField: "sports", // Campo en `athletes`
          foreignField: "_id", // Campo en `sports`
          as: "sports", // Alias para los datos
        },
      },
    ])
    .toArray();
};

export const insertOne = async (req) => {
  const athlete = validateAthlete(req);
  const result = await athleteCollection.insertOne(athlete);
  return result;
};

export const updateOne = async (id, updatedData) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es válido.");
  }

  const updateQuery = {
    $set: updatedData, // Solo actualiza los campos proporcionados
  };

  const result = await athleteCollection.updateOne(
    { _id: new ObjectId(id) }, // Filtra por el ID del documento
    updateQuery
  );

  if (result.matchedCount === 0) {
    throw new Error("No se encontró ningún athlete con ese ID.");
  }

  return result;
};

export const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("El ID proporcionado no es válido.");
  }

  const result = athleteCollection.deleteOne({ _id: new ObjectId(id) });
  if (result.matchedCount === 0) {
    throw new Error("No se encontró ningún athlete con ese ID.");
  }

  return result;
};
