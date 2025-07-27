"use client"

import Results from "@/components/Results"
import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"

export default function Favourite() {
    const [results, setResults] = useState([{
        movieId: "",
        title: "",
        image: "",
        description: "",
        dateReleased: "",
        rating: ""
    }])
    const { isSignedIn, user, isLoaded } = useUser()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/user/getFav", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setResults(data.favs)
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (isLoaded && isSignedIn && user) {
            fetchData()
        }
    }, [isLoaded, isSignedIn, user])

    return (
        <div className='w-full'>
            {!results || (results.length === 0 && (<div className='text-center pt-6'>No result found </div>))}

            {results && results.length !== 0 && <Results results={results.map((result) => ({
                ...result,
                id: result.movieId,
                title: result.title,
                backdrop_path: result.image,
                overView: result.description,
                first_air_date: result.dateReleased,
                vote_count: result.rating
            }))} />}
        </div>
    )
}
