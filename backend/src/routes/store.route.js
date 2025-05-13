import { Router } from "express";
import { createStore, getAllStore, addRating } from "../controller/store.controller.js";

const router = Router();

router.post("/create", createStore);
router.get("/all", getAllStore);
router.post("/addRating", addRating);

export default router;
