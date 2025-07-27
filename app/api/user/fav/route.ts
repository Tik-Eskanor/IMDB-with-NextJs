import User from "@/lib/models/User";
import connect from "@/lib/mongodb/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";


export const PUT = async (req) => {

    const user = await currentUser() //user
    const client = await clerkClient()// to get metadata details of user

    try {
        await connect()
        const data = await req.json()

        if (!user) return { status: 401, body: 'Unauthorize' }
        const userId = user.publicMetadata.userMongoId

        const existingUser = await User.findById(userId)

        if (existingUser?.favs.some((fav) => fav.movieId === data.movieId)) {
            const updatedUser = await User.findByIdAndUpdate(user.publicMetadata.userMongoId,
                {
                    $pull: { favs: { movieId: data.movieId } }//update the faveroute movie array of user by pulling it(removing it)
                },
                { new: true } //return the new updated data
            )

            const updatedFavs = updatedUser?.favs.map((fav) => fav.movieId)
            await client.users.updateUserMetadata(user.id, {
                publicMetadata: {
                    favs: updatedFavs
                }
            })

            return new Response(JSON.stringify(updatedUser), { status: 200 })
        }
        else {
            const updatedUser = await User.findByIdAndUpdate(user.publicMetadata.userMongoId,
                {
                    $addToSet: {  //update the faveroute movie array of user by adding a new movie to it
                        favs:
                        {
                            movieId: data.movieId,
                            title: data.title,
                            description: data.overview,
                            dateReleased: data.releaseDate,
                            rating: data.voteCount,
                            image: data.image,
                        }
                    }
                },
                { new: true }//return the new updated data
            )
            // console.log(updatedUser)
            const updatedFavs = updatedUser?.favs.map((fav) => fav.movieId)
            await client.users.updateUserMetadata(user.id, {
                publicMetadata: {
                    favs: updatedFavs
                }
            })

            return new Response(JSON.stringify(updatedUser), { status: 200 })

        }
    } catch (error) {
        console.log("Error ading fav to user:", error)
        return new Response("Error adding fav to user", { status: 500 })
    }
}
