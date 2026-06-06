// import dependecies as well as types from express
import { Request, Response } from "express";
import { createTopic, deleteTopic, getAllTopics, getTopicById, updateTopic } from "../services/topicService";
import { getCommentsByTopic } from "../services/commentService";

// create controller function - topic
export async function createNewTopic(req: Request, res: Response) {
    try {
        // get the user id from the session
        const userId = req.session.user?.id;

        // if the id is missing - redirect to login
        if (!userId) {
            return res.redirect("auth/login");
        }

        // create the topic using the service function
        const topic = await createTopic(req.body, userId);

        // redirect to page
        res.redirect(`/topics/${topic._id}`);

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
// get all topics controller function
export async function getTopics(req: Request, res: Response) {
    try {
        // wait to get all topics
        const topics = await getAllTopics();

        // render results
        res.render("index", {
            title: "Topics",
            topics
        });

    } catch (error) {
        // send internal error msg
        res.status(500).json({
            "message": "Failed to retrieve all topics"
        });
    }
}
// get topic by the id
export async function getTopic(req: Request, res: Response) {
    try {
        // narrow the type of params.id 
        const topicId = req.params.id;
        // typescript was inferring that topic id was String[], this narrows to only string
        if (!topicId || Array.isArray(topicId)) {
            return res.status(400).json({
                "message": "Topic id is required"
            });
        }

        // get the topic by its id
        const topic = await getTopicById(topicId);
        // get also the comments
        const comments = await getCommentsByTopic(topicId);

        res.render("topics/show", {
            title: topic.title,
            topic,
            comments
        });
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Failed to retrieve that topic"
            });
        }
    }
}
// delete the topic by the id
export async function deleteTopicById(req: Request<{ id: string }>, res: Response) {
    try {
        // get the user id from session
        const userId = req.session.user?.id;

        // send error status and msg if there is no session
        if (!userId) {
            return res.status(401).json({
                "message" : "Unauthorized"
            });
        }

        // delete the topic using the service function
        const deletedTopic = await deleteTopic(req.params.id, userId);
        // send the success msg 
        res.status(200).json({
            "message" : "Topic deleted successfully",
            "topic": deletedTopic
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Failed to delete that topic"
            });
        }
    }
}
// update the topic
export async function updateTopicById(req: Request<{ id: string }>, res: Response) {
    try {
        // get the user id
        const userId = req.session.user?.id;
        // if userid is missing -- throw new error
        if (!userId) {
            return res.status(401).json({
                "message": "Unauthorized"
            });
        }
        // use model function 
        const updatedTopic = await updateTopic(req.params.id, userId, req.body);
        // send success msg
        res.status(200).json({
            "message": "Topic updated successfully",
            "topic": updatedTopic
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                "message": error.message
            });

        } else {
            // internal error msg
            res.status(500).json({
                "message": "Failed to update that topic"
            });
        }
    }
}
// fuction that handles the rendering for new topic to create
export function renderNewTopicPage(req: Request, res: Response){
    // render the new page with view
    res.render("topics/new", {
        title: "Create Topic"
    });
}