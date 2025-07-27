'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full" >
            <div className='p-5' >
                <h2 className='text-2xl' > Opps having a bit of trouble </h2>
                < h2 className='text- lg mb-3' > Try again or come back later </h2>
                < button
                    className='cursor-pointer bg-red-400 p-2 rounded-md'
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </div>

    )
}