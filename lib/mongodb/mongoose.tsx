import mongoose, { Mongoose } from "mongoose";

let initialize = false

export default async function connect(): promise<void> | promise<Mongoose> {
    mongoose.set('strictQuery', true)
    if (initialize) {
        console.log("MongoDB already connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || "")
        initialize = true;
        console.log("Mongodn connected")
    } catch (error) {
        console.log("mongodn connection error", error)
    }
}