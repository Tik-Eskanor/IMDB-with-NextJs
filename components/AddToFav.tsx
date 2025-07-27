"use client"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AddToFav({ movieId, title, image, overview, releaseDate, voteCount }) {
    const [isFav, setIsFav] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        if (isSignedIn && user && isLoaded) {
            setIsFav(user.publicMetadata?.favs?.includes(movieId))
            setIsLoading(false)
        }
        else {
            setIsLoading(false)
        }
    }, [user, movieId, isLoaded, isSignedIn])

    const handleFavClick = async () => {
        setIsLoading(true)
        if (!isSignedIn) {
            setIsLoading(false)
            router.push("/sign-in")
            return;
        }

        try {
            const res = await fetch('/api/user/fav', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movieId,
                    title,
                    image,
                    overview,
                    releaseDate,
                    voteCount
                })
            })
            if (res.ok) {
                setIsFav(!isFav)
            }
            else {
                console.log("failed to update profile")
            }
        } catch (error) {
            console.log("Error:" + error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <button
                onClick={handleFavClick}
                disabled={isLoading}
                className={`p-2 rounded cursor-pointer ${isFav ? 'bg-red-300' : 'bg-gray-300'}`}
            >
                {isLoading ? 'Loading' : isFav ? 'Remove from favourite' : 'Add to favourite'}
            </button>
        </div>
    )
}
