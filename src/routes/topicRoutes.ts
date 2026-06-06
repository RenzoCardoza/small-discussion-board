// import the router for routes, auth verification function and the create topic function from controller
import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import { createNewTopic } from "../controllers/topicController";

// create a new instance of router
const router = Router();

// create a new topic route
router.post("/", authCheck, createNewTopic);


//export the router to mount it on the app
export default router;