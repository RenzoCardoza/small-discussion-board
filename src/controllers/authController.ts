// import dependencies
import { Request, Response } from 'express';
import { registerUser } from '../services/authService';

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