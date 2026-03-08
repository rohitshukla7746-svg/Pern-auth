import express from "express";
import { middlewareAuth } from "../middleware/auth.middleware.js";
import { getUserData } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/data", middlewareAuth, getUserData);

export default router;
