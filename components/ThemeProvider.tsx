"use client"
import { ThemeProvider } from 'next-themes'

function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="data-theme" defaultTheme='system'>
            <div>
                {children}
            </div>
        </ThemeProvider>
    )
}

export default Provider