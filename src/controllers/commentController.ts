// dependencies
import { Request, Response } from "express";
import { createComment } from "../services/commentService";

// function that handles creating a new comment
export async function createNewComment(req: Request<{ topicId: string }>, res: Response) {
    try{
        // get the user id
        const userId = req.session.user?.id;

        // if not logged in send unauthorized
        if (!userId) {
            return res.status(401).json({
                "message": "Unauthorized"
            });
        }

        // create the comment
        const comment = await createComment(req.params.topicId, userId, req.body);

        // send success msg
        res.status(201).json({
            "message" : "New comment was created",
            "comment" : comment
        });

    } catch (error) {
        // same error msg for now
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Failed to create new comment"
            });
        }
    }
}