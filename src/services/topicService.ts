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
// function to retreive all topics
export async function getAllTopics(){
    // use model function to get all in the collection
    const topics = await Topic.find()
        .populate("author", "username email")
        .sort({ createdAt: -1 });

    // return the list
    return topics;
}
// function to get topic by its id
export async function getTopicById(id: string) {
    // use model function to find by the id - then populate the authorId with the actual data
    const topic = await Topic.findById(id).populate("author", "username email");

    // if cannot find it, throw new error
    if (!topic) {
        throw new Error("Cannot find that Topic");
    }

    return topic;
}
// function to delete topic -- only author can delete the topic
export async function deleteTopic(topicId: string, userId: string) {
    // find the topic by its id first
    const topic = await Topic.findById(topicId);

    // if there is no topic, throw error
    if (!topic) {
        throw new Error("Topic not found");
    }

    // if the the user id and author id do not match then cancel operation
    if (topic.author.toString() !== userId){
        throw new Error("Only the author can delete this topic");
    }

    // use model function to delete by the id
    await Topic.findByIdAndDelete(topicId);

    // return what was deleted
    return topic;
}