import connect from "../mongodb/mongoose"
import User from "../models/User"

export const createOrUpdateUser = async (id, first_name, last_name, image_url, email_addresses) => {
    try {
        connect()
        console.log("starting")
        const user = await User.insertOne({
            clerkId: id,
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            email: email_addresses[0].email_address

        })
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