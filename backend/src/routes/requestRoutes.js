import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { createRequest } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", requireAuth, createRequest);

export default router;
