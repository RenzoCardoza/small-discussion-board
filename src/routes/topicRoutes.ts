// import the router for routes, auth verification function and the create topic function from controller
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewTopic, getTopic, getTopics } from "../controllers/topicController";

// create a new instance of router
const router = Router();

// get all topics
router.get("/", getTopics);
// get a topic by its id
router.get("/:id", getTopic);
// create a new topic route
router.post("/", authCheck, createNewTopic);


//export the router to mount it on the app
export default router;