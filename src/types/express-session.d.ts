// import dependency
import "express-session";

// create a new module for the type of session data
declare module "express-session" {
    interface SessionData {
        user?: {
            id: string;
            username: string;
            email: string;
        };
    }
}