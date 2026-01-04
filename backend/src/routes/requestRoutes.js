import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createRequest,
  updateRequestStatus,getMyRequests,
  getReceivedRequests
} from "../controllers/requestController.js";
 
const router = express.Router();
 
/**
 * Create request
 */
router.post("/", requireAuth, createRequest);

/**
 * My Requests (Helper side)
 */
router.get("/my", requireAuth, getMyRequests);

/**
 * Requests received (Task owner side)
 */
router.get("/received", requireAuth, getReceivedRequests);
 
/**
 * Accept / Reject request
 */
router.patch("/:requestId/status", requireAuth, updateRequestStatus);
 
export default router;