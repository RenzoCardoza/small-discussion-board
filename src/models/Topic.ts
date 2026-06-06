// import dependencies
import mongoose from "mongoose";

// interface for topic 
export interface ITopic {
    title: string;
    author: mongoose.Types.ObjectId;
    content: string;
}

// schema for topic -- same as users with timestamps active
const topicSchema = new mongoose.Schema<ITopic>({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Content of the Topic is required"]
    }
}, { timestamps: true });

// create the model using the schema, then export it - same rule as user - if the model exists use the existing one, else create a new model
export const Topic : mongoose.Model<ITopic> = mongoose.models.Topic as mongoose.Model<ITopic> || mongoose.model<ITopic>("Topic", topicSchema);