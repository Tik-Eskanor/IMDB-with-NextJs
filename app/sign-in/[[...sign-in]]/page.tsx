import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function page() {
    return (
        <div className="flex justify-center px-2">
            <SignIn />
        </div>
    )
}
