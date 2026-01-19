import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createRequest,
  updateRequestStatus,
  getMyRequests,
  getReceivedRequests,
  declineRequest,
  cancelRequest
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
 * Accept request
 */
router.patch("/:requestId/status", requireAuth, updateRequestStatus);

/**
 * Decline request (Task owner declines a pending request)
 */
router.delete("/:requestId/decline", requireAuth, declineRequest);

/**
 * Cancel request (Requester cancels their pending request)
 */
router.delete("/:requestId", requireAuth, cancelRequest);
 
export default router;