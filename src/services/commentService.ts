// import comment and topic
import { Comment } from "../models/Comment";
import { Topic } from "../models/Topic";

// export type for comment input
export type CreateCommentInput = {
    content: string;
}
// export type for comment input update
export type UpdateCommentInput = {
    content?: string;
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
// get comments by topic
export async function getCommentsByTopic(topicId: string) {
    // get all comments by their topic -- populate based on the author id, finally sort them by recents
    const comments = await Comment.find({
        topic: topicId
    })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

    // return comments
    return comments;
}
// delete comment function
export async function deleteComment(commentId: string, userId:string) {
    // get the comment to be deleted
    const comment = await Comment.findById(commentId);
    // if exists proceed otherwise cancel operation
    if (!comment) {
        throw new Error("Comment does not exist");
    }
    // delete only available to owner - check ids to match if not throw error
    if (comment.author.toString() !== userId) {
        throw new Error("Only the author can delete this comment");
    }
    // delete using model function
    await Comment.findByIdAndDelete(commentId);
    // return what was deleted
    return comment;
}
// update the comment 
export async function updateComment(commentId: string, userId:string, input: UpdateCommentInput) {
    //get the comment to be updated
    const comment = await Comment.findById(commentId);
    // throw error if not found
    if (!comment) {
        throw new Error("comment not found");
    }
    // match the user id with owner id
    if (comment.author.toString() !== userId) {
        throw new Error("only author can update the comment");
    }
    // content cannot be empty
    if (input.content !== undefined){
        comment.content = input.content.trim();
    }
    if (!comment.content) {
        throw new Error("comment cannot be empty")
    }
    // save the document with changes
    await comment.save();

    // return the updated comment
    return comment;
}
// service that get comment by its id 
export async function getCommentById(commentId: string) {
    // get the comment
    const comment = await Comment.findById(commentId).populate("author", "username email");
    // if not, throw error
    if (!comment) {
        throw new Error("Comment not found");
    }
    // return it
    return comment;
}