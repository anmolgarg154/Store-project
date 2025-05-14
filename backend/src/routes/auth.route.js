import { Router } from "express";
import { signup, login, allUsers } from "../controller/auth.controller.js";

const router = Router();

router.get("/all-user", allUsers);
router.post("/signup", signup);
router.post("/login", login);

export default router;
