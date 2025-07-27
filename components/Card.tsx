import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'

export default function Card({ result }) {
    return (
        <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg 
        sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
            <Link href={`/movie/${result.id}`}>
                <Image src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`} alt="image" width={1000} height={1000}
                    className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300 w-full sm:h-36 object-cover' />
                <div className='p-2'>
                    <p className="line-clamp-3 text-sm">{result.overview}</p>
                    <h2 className='font-bold truncate my-2 text-sm'>{result.title || result.name}</h2>
                    <div className="flex items-center text-xs">
                        <span>{result.release_date || result.first_air_date}</span>
                        <div className="flex"><FaThumbsUp size={13} className='mr-1 ml-3' />
                            <span>{result.vote_count}</span></div>
                    </div>
                </div>
            </Link>

        </div>
    )
}
