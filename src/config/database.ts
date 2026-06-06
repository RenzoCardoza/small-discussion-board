// dependencies for the file 
import mongoose from "mongoose";

// create and export a function to connect to the database
export async function connectDb() {
    // try the code first, if any errors show up, catch them
    // and send them to the server.
    try {
        // narrow type to string for env variable
        if (!process.env.MONGO_URI){
            // throw error if URI is undefined or uknown
            throw new Error("Database URI is missing");
        }
        // connect to the database with the connection string
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "discussion-board"
        });

        // success message
        console.log("Database connected sucessfully!");

    } catch (error){
        // check if error is type error
        if (error instanceof Error){
            // log the error to the console
            console.log(error.message);
        } else {
            // log generic message for error
            console.log("Something went wrong while connecting the database");
        }
        // re throw the error so the server catches it
        throw error;
    }
}