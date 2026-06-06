// dependencies
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewComment, getTopicComments, deleteCommentById, updateCommentById } from "../controllers/commentController";

// new router instance
const router = Router();

// get comments by topic
router.get("/:topicId", getTopicComments)
// create a new comment
router.post("/:topicId", authCheck, createNewComment);
// update a comment
router.put("/:commentId", authCheck, updateCommentById)
// delete a comment
router.delete("/:commentId", authCheck, deleteCommentById);

export default router;