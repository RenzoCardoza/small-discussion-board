// import express function types for this middleware
import { Request, Response, NextFunction } from "express";

// function that acts as a shield to protect routes
export function authCheck(req: Request, res: Response, next: NextFunction){
    // check if the session is active or the user is logged in
    if (!req.session.user) {
        // for now return a json
        return res.status(401).json({
            "message": "Unauthorized"
        });
    }

    // call the next function that moves to next middleware
    // if this is missing the callback gets stuck
    next();
}