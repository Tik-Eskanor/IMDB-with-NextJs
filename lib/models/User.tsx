// models/Movie.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define the TypeScript interface for the Movie document
interface fav extends Document {
    movieId: string;
    title: string;
    description: string;
    dateReleased: string;
    rating: number;
    image: string;
}

interface user extends Document {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    favs: [fav];
}

// Define the Mongoose schema
const favSchema: Schema<fav> = new Schema(
    {
        movieId: {
            type: String,
            required: true,
            unique: true, // Ensures movieId is unique in the collection
        },
        title: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing whitespace
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        dateReleased: {
            type: String,
            required: true,

        },
        rating: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);


const userSchema: Schema<user> = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Basic email validation
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        profilePicture: {
            type: String,
            required: true,
        },
        favs: {
            type: [favSchema],
            default: []
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the model
const User: Model<user> = mongoose.model<user>("User", userSchema, 'users');

export default User;