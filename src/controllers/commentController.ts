// dependencies
import { Request, Response } from "express";
import { createComment, getCommentsByTopic, deleteComment, updateComment } from "../services/commentService";

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
// function that handles getting comments by topic
export async function getTopicComments(req: Request<{ topicId: string }>, res: Response) {
    try {
        // get the comments using service
        const comments = await getCommentsByTopic(req.params.topicId);

        // send success msg
        res.status(200).json({
            "comments" : comments
        });

    } catch (error) {
        // send internal error msg
        res.status(500).json({
            "message": "Failed to get comments"
        });
    }
}
// function that handles deleting a comment by its id
export async function deleteCommentById(req: Request<{ commentId: string }>, res: Response) {
    try {
        // get the user id from session
        const userId = req.session.user?.id;
        
        //if user is not logged in send unauthorized msg
        if (!userId) {
            return res.status(401).json({
                "message": "Unauthorized"
            });
        }

        // delete the comment
        const deletedComment = await deleteComment(req.params.commentId, userId);
        // send success msg
        res.status(200).json({
            "message": "comment was deleted",
            "comment": deletedComment
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
                "message": "Failed to delete comment"
            });
        }
    }
}
// function that updates comments
export async function updateCommentById(req: Request<{ commentId: string }>, res: Response) {
    try {
         // get the user id from session
        const userId = req.session.user?.id;
        
        //if user is not logged in send unauthorized msg
        if (!userId) {
            return res.status(401).json({
                "message": "Unauthorized"
            });
        }

        // update the comment
        const updatedComment = await updateComment(req.params.commentId, userId, req.body);
        // send success msg
        res.status(200).json({
            "message": "comment was updated",
            "comment": updatedComment
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
                "message": "Failed to update comment"
            });
        }
    }
}