// dependencies
import { Request, Response } from "express";
import { createComment, getCommentsByTopic, deleteComment, updateComment, getCommentById } from "../services/commentService";

// function that handles creating a new comment
export async function createNewComment(req: Request<{ topicId: string }>, res: Response) {
    try{
        // get the user id
        const userId = req.session.user?.id;
        const topicId = req.params.topicId;

        // if not logged redirect
        if (!userId) {
            return res.redirect("/auth/login");
        }

        // create the comment
        const comment = await createComment(req.params.topicId, userId, req.body);

        // redirect after success
        res.redirect(`/topics/${topicId}`);

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
        // redirect if successful
        res.redirect(`/topics/${deletedComment.topic}`);

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
        // redirect if success
        res.redirect(`/topics/${updatedComment.topic}`);
    
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
// function that renders the edit comment page
export async function renderEditCommentPage(req: Request<{ commentId: string }>, res: Response) {
    try {
        // get id from session
        const userId = req.session.user?.id;
        // redirect if not authorized
        if (!userId) {
            return res.redirect("/auth/login");
        }
        // get the comment
        const comment = await getCommentById(req.params.commentId);
        // if the owner does this, proceed, otherwise shut it down
        if (comment.author._id.toString() !== userId) {
            return res.status(403).send("Forbidden");
        }
        // render the page
        res.render("comments/edit", {
            title: "Edit Comment",
            comment
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Failed to load edit comment page"
        });
    }
}