import express from "express";
import {
  deleteOne,
  getAll,
  insertOne,
  updateOne,
} from "../controllers/sports.controller.js";

export const sportRouter = express.Router();

sportRouter.get("/", async (req, res, next) => {
  try {
    const sports = await getAll();
    res.json(sports);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

sportRouter.post("/", async (req, res, next) => {
  try {
    const result = await insertOne(req.body);
    res.status(201).json({ message: "Deporte creado", id: result.insertedId });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

sportRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateOne(id, req.body);
    res.status(201).json({
      message: "Sport actualizado correctamente",
      data: result,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

sportRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteOne(id);
    res.status(201).json({ message: "Sport removido correctamente" });
  } catch (error) {
    res.status(400);
    next(error);
  }
});
