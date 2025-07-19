import mongoose, { Mongoose } from "mongoose";


export default function connect(): promise<void> | promise<Mongoose> {
    mongoose.connect(process.env.MONGODB_URI || "")
        .then(() => console.log('Connected to MongoDB: next-imdb'))
        .catch(err => console.error('Connection error:', err));
}