// import dependencies
import { Router } from "express";
import { register } from "../controllers/authController";

// create a router object from express
const router = Router();

// POST route for registration
router.post("/register", register);



// export router with all routes
export default router;