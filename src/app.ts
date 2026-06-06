// import statements 
import express from "express";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import topicRoutes from "./routes/topicRoutes";

// declare app to use express
const app = express();

// middleware to read JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session middleware 
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}));
    
// router for the authentication routes
app.use("/auth", authRoutes);
app.use("/topics", topicRoutes);

// base routes and other routes for the app
app.get("/", (req, res) =>{
    // test sending simple response
    res.json({
        "message": "App working"
    });
});

export default app;