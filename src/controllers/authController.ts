// import dependencies
import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

// controller that handles the user registration
export async function register(req: Request, res: Response){
    try {
        // register user using service
        const user = await registerUser(req.body);

        // log the user after registration
        req.session.user = user;

        // redirect after registration
        res.redirect("/topics");

    } catch (error) {

        // messages in json for now
        if (error instanceof Error) {
            // send error message and set status code for bad request
            res.status(400).json({
                "message": error.message
            });
        } else {
            // same as above but for internal server error
            res.status(500).json({
                message: "Registration Failed"
            });
        }
    }
}
// controller that handles login
export async function login(req: Request, res: Response){
    try {
        // use auth service method to log the user with the data from the body
        const user = await loginUser(req.body);

        // log the user
        req.session.user = user;

        // redirect
        res.redirect("/topics");
    } catch (error) {
        // according to the type of error send a json msg
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Login Failed"
            });
        }
    }
}
// controller to handle logout
export async function logout(req: Request, res: Response){
    // destroy the session = log out the user
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                "message": "logout failed"
            });
        }

        // redirect the user to the main page
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
}