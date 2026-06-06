// import dependecies as well as types from express
import { Request, Response } from "express";
import { createTopic } from "../services/topicService";

// create controller function - topic
export async function createNewTopic(req: Request, res: Response) {
    try {
        // get the user id from the session
        const userId = req.session.user?.id;

        // if the id is missing - handle error with unauthorized
        if (!userId) {
            return res.status(401).json({
                "message": "Unauthorized"
            });
        }

        // create the topic using the service function
        const topic = await createTopic(req.body, userId);

        // send response (for now) - json
        res.status(201).json({
            "message": "Topic was created sucessfully",
            "topic": topic
        });
    } catch (error) {
        // same error distinguish to send different status codes
        // according to the type of error send a json msg
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Failed to create Topic"
            });
        }
    }
}