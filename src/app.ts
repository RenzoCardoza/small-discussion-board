// import statements 
import express from "express";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import topicRoutes from "./routes/topicRoutes";
import commentRoutes from "./routes/commentRoutes";
import { getHomePage } from "./controllers/baseController";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import path from "path";

// declare app to use express
const app = express();

// view engine setup for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use layouts
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// middleware to read JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

// this allows app to use static files
app.use(express.static(path.join(__dirname, "../public")));

// session middleware 
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}));

// middleware to make req.session.user available globally over views
app.use((req, res, next) =>{
    res.locals.user = req.session.user || null; // the session or null (logged out)
    next();
});
    
// router for the authentication routes
app.use("/auth", authRoutes);
app.use("/topics", topicRoutes);
app.use("/", commentRoutes);

// base routes and other routes for the app
app.get("/", getHomePage);

export default app;