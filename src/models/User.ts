// require mongoose to create the schema to then have model later
import mongoose from "mongoose";

// User interface/type
export interface IUser {
    username : string;
    email : string;
    passwordHash: string;
}

// schema for my users -- option timestamps active since it will createdAt automatically
const userSchema = new mongoose.Schema<IUser>({
    username: {
        required: [true, "Username is required"],
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, "A password is required"],
        select: false
    }
}, {timestamps: true});

// create a model using the schema -- if the models exists use the existing one
export const User : mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);