// import dependencies
import mongoose from "mongoose";

// export interface for Icomment
export interface IComment {
    content: string;
    author: mongoose.Types.ObjectId;
    topic: mongoose.Types.ObjectId;
}

// schema for the comments
const commentSchema = new mongoose.Schema<IComment>({
    content: {
        type: String, 
        required: [true, "Comment content is required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    }
}, { timestamps: true });

// export comment model 
export const Comment: mongoose.Model<IComment> = mongoose.models.Comment as mongoose.Model<IComment> || mongoose.model<IComment>("Comment", commentSchema);