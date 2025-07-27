"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavItem({ title, param }: { title: string, param: string }) {

    const genre = usePathname().split('/').pop()

    return (
        <div>
            <Link
                href={`/top/${param}`}

                className={`hover:text-amber-600 font-semibold ${genre === param ?
                    'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
                    : ''}`}>
                {title}
            </Link>
        </div>
    )
}
