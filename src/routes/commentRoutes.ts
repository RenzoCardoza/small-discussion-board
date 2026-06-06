// dependencies
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewComment } from "../controllers/commentController";

// new router instance
const router = Router();

// create a new comment
router.post("/:topicId", authCheck, createNewComment);


export default router;