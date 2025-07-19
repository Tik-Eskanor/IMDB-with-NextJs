import mongoose, { Mongoose } from "mongoose";


export default function connect() {
    mongoose.set('debug', true);
    mongoose.connect(process.env.MONGODB_URI || "")
        .then(() => console.log('Connected to:', mongoose.connection.name))
        .catch(err => console.error('Connection error:', err));
}