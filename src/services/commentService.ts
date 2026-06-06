// import comment and topic
import { Comment } from "../models/Comment";
import { Topic } from "../models/Topic";

// export type for comment input
export type CreateCommentInput = {
    content: string;
}

// create a comment function
export async function createComment(topicId: string, userId: string, input:CreateCommentInput) {
    // separate content from input
    const { content } = input;

    // if there is not content throw error
    if (!content.trim()){
        throw new Error("Comment content is required");
    }

    // check if topic exists if not throw error
    const topicExists = await Topic.findById(topicId);

    if (!topicExists) {
        throw new Error("Topic not found");
    }
    // create the document
    const comment = await Comment.create({
        content: content.trim(),
        author: userId,
        topic: topicId
    });
    // return the new comment
    return comment
}