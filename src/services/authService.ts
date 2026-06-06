// require dependencies 
import bcrypt from 'bcrypt';
import { User } from '../models/User';

//type for my user input and safe user data
export type RegisterUserInput = {
    username: string;
    email: string;
    password: string;
}
// safe user type data that will be returned by the function below
export type SafeUser = {
    id: string;
    username: string;
    email: string;
}

//function that handles the register for users
export async function registerUser(input: RegisterUserInput): Promise<SafeUser> {
    // separate the fields using destructuring
    const { username, email, password } = input;

    // validation for the fields
    // if any of these are missing throw error
    if (!username.trim() || !email.trim() || !password.trim()) {
        throw new Error("All fields are required for register");
    }
    
    // normaliza user input
    const normalizedUsername = username.trim();
    const normalizedEmail = email.toLowerCase().trim();
    
    // check if email exists already
    const userExists = await User.findOne({
        email: normalizedEmail
    });
    
    // throw error if the exists users is true
    if (userExists) {
        throw new Error("Email already registered");
    }

    //hash the password then store it on a new variable
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user on the db
    const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash: hashedPassword
    });

    // return the user.
    return {
        id : user._id.toString(),
        username: user.username,
        email: user.email
    }
}