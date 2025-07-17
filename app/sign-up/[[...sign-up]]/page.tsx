import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function page() {
    return (
        <div className="flex justify-center px-2">
            <SignUp />
        </div>)
}
