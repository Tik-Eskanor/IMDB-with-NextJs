import AddToFav from '@/components/AddToFav'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Param = {
    params: Promise<{ id: string }>
}
export default async function page({ params }: Param) {
    const id = (await params).id
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)
    const movie = await res.json()
    if (!res.ok) {
        <div className='text-center mt-10'>
            <div className="text-xl my-5">
                Movie details are not available
            </div>
            <div>
                <Link href="/">Go home</Link>
            </div>
        </div>
    }
    return (
        <div className='w-full'>
            <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
                <Image src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} alt='' width={1000} height={1000} className='rounded-lg w-full md:w-69 h-56 object-cover' />
                <div className="p-2">
                    <div className="text-lg font-bold mb-3">{movie.title} </div>
                    <p className="text-lg mb-3">{movie.overview}</p>
                    <p className='mb-3'>
                        <span className="mr-1 font:semibold">Date released:</span>
                        {movie.release_date || movie.first_air_date}
                    </p>
                    <p className='mb-3'>
                        <span className="mr-1 font:semibold">Rating:</span>
                        {movie.vote_count}
                    </p>
                    <AddToFav
                        movieId={id}
                        title={movie.title}
                        image={movie.backdrop_path || movie.poster_path}
                        overview={movie.overview}
                        releaseDate={movie.release_date || movie.first_air_date}
                        voteCount={movie.vote_count}
                    />
                </div>
            </div>
        </div>
    )
}
