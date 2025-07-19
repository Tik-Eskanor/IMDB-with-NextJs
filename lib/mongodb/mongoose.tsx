import mongoose, { Mongoose } from "mongoose";


export default function connect() {
    mongoose.connect(process.env.MONGODB_URI || "")
        .then(() => console.log('Connected to MongoDB: next-imdb'))
        .catch(err => console.error('Connection error:', err));
}