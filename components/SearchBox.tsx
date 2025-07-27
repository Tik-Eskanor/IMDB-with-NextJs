"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBox() {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/search/${search}`)
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} className='flex justify-between max-w-6xl px-5 mx-auto'>
                <input type="text"
                    placeholder='Search keywords...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full h-14 rounded-md placholder-gray-500 outline-none bg-transparent flex-1' />
                <button
                    disabled={search === ''}
                    className='text-amber-600 disabled:text-gray-400 cursor-pointer'
                > Search </button>
            </form>
        </div>
    )
}
