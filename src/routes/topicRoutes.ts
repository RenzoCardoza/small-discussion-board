// import the router for routes, auth verification function and the create topic function from controller
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewTopic, deleteTopicById, getTopic, getTopics, renderNewTopicPage, updateTopicById } from "../controllers/topicController";

// create a new instance of router
const router = Router();

// get all topics
router.get("/", getTopics);
// get route for creating a new topic
router.get("/new", authCheck, renderNewTopicPage);
// create a new topic route
router.post("/", authCheck, createNewTopic);
// get a topic by its id
router.get("/:id", getTopic);
// update a topic
router.put("/:id", authCheck, updateTopicById)
//delete a topic
router.delete("/:id", authCheck, deleteTopicById);


//export the router to mount it on the app
export default router;