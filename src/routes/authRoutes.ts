// import dependencies
import { Router } from "express";
import { register, login, logout, renderLoginPage, renderRegisterPage } from "../controllers/authController";

// create a router object from express
const router = Router();

//render routes for login and register
router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);

// POST route for registration
router.post("/register", register);
// post route for login
router.post("/login", login);
// post logout
router.post("/logout", logout);

// export router with all routes
export default router;