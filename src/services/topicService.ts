// import the model for topic
import { Topic } from "../models/Topic";

// type for the input when creating topic
export type CreateTopicInput = {
    title: string;
    content: string;
} 

// function that creates the topic and returns the topic
export async function createTopic(input:CreateTopicInput, authorId:string){
    // separate values from the input
    const { title, content } = input;

    // throw error if there is missing fields
    if (!title.trim() || !content.trim()) {
        throw new Error("Title and content are required");
    }

    // create the topic on mongodb
    const topic = await Topic.create({
        title: title.trim(),
        content: content.trim(),
        author: authorId
    });

    return topic;
}