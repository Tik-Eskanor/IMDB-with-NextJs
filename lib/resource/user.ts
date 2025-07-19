import connect from "../mongodb/mongoose"
import User from "../models/User"

export const createOrUpdateUser = async (id: string, first_name: string, last_name: string, image_url: string, email_address: string) => {
    try {
        connect()
        console.log("starting")
        const user = await User.findOneAndUpdate({ clerkId: id }, {
            $set: {
                firstName: first_name,
                lastName: last_name,
                profilePicture: image_url,
                email: email_address
            }
        },
            { upsert: true, new: true })
        console.log(user)
        return user

    } catch (error) {
        console.log("Error could not create or update user:", error)
    }
}

export const deleteUser = async (id: string) => {
    try {
        connect()
        await User.findOneAndDelete({ clerkId: id })
    } catch (error) {
        console.log('Error: Could not delete user:', error)
    }
}