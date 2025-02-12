import express from "express";
import { deleteOne, getAll, getOne, insertOne, updateOne } from "../controllers/athletes.controller.js";

export const athletesRouter = express.Router();

athletesRouter.get("/", async(req, res, next) => {
  try {
    const athlete = await getAll();
    res.json(athlete);
  } catch (error) {
    res.status(500);
    next(error)
  }
});
athletesRouter.get("/:id", async(req, res, next) => {
  try {
    const { id } = req.params;
    const athlete = await getOne(id);
    res.json(athlete);
  } catch (error) {    
    res.status(500);
    next(error)
  }
});

athletesRouter.post("/", async(req, res, next) => {
  try {    
    const result = await insertOne(req.body)
    res.status(201).json({ message: "Atleta creado", id: result.insertedId });
  } catch (error) {
    res.status(400);
    next(error)
  }
});

athletesRouter.put("/", async(req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateOne(id, req.body) 
    res
      .status(201)
      .json({
        message: "Atleta actualizado correctamente",
        id: result.insertedId,
      });
  } catch (error) {
    res.status(400);
    next(error)
  }
});

athletesRouter.delete("/", async(req, res, next) => {
  try {
    const { id } = req.params;
    await deleteOne(id);
    res.status(201).json({ message: "Atleta removido correctamente" });
  } catch (error) {
    res.status(400);
    next(error)
  }
});
