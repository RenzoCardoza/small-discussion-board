// import dependencies
import dotenv from "dotenv";
import { connectDb } from "./config/database";
import app from "./app";

// load env variables
dotenv.config();
// I am getting the port value from the env file and then make it so it is type number or fallback into the value 3000
const PORT = Number(process.env.PORT) || 3000;

// start server - connect to db and start app
async function startServer() {
    try {
        // connect to the db before starting the App
        await connectDb();

        // validate the session secret before starting the app
        if (!process.env.SESSION_SECRET){
            throw new Error("Session Secret is missing.");
        }

        // start the app once db was successful
        app.listen(PORT, () =>{
            console.log(`App listening on ${process.env.HOST}:${PORT}`);
        });

    } catch (error) {
        // log error to the console for now
        console.log(error);
        // exit the process. - shut down the server
        process.exit(1);
    }
}
// call the function and start server
startServer();