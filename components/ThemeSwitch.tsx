'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
            <button
                aria-label="Toggle Dark Mode"
                className="flex cursor-not-allowed items-center transition-opacity duration-300 hover:brightness-125"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                {mounted && theme === 'dark' ? <Sun /> : <Moon />}
            </button>

    )
}

export default ThemeSwitch
