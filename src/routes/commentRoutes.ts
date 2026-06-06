// dependencies
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewComment, getTopicComments, deleteCommentById, updateCommentById } from "../controllers/commentController";

// new router instance
const router = Router();

// get comments by topic
router.get("/topics/:topicId/comments", getTopicComments)
// create a new comment
router.post("/topics/:topicId/comments", authCheck, createNewComment);
// update a comment
router.put("/comments/:commentId", authCheck, updateCommentById)
// delete a comment
router.delete("/comments/:commentId", authCheck, deleteCommentById);

export default router;