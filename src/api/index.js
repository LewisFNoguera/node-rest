import express from "express";
import { sportRouter } from "./sports.js";
import { athletesRouter } from "./athletes.js";

export const router = express.Router();

router.use('/athletes', athletesRouter)
router.use('/sports', sportRouter)