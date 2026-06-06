// import dependencies
import { Router } from "express";
import { register, login } from "../controllers/authController";

// create a router object from express
const router = Router();

// POST route for registration
router.post("/register", register);

router.post("/login", login);

// export router with all routes
export default router;