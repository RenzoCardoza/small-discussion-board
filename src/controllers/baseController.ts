// import types from express and dependencies
import { Request, Response } from "express";
import { getAllTopics } from "../services/topicService";

// base function that handles the home or base for app
export async function getHomePage(req: Request, res: Response) {
    try {
        // get all the topics to display on the home page
        const topics = await getAllTopics();

        // render to user content for home page
        res.render("index", {
            topics,
            user: req.session.user
        });
    } catch (error) {
        // send error msg
        res.status(500).json({
            "message" : "Something went wrong with Home Page"
        });
    }
}