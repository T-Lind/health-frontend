import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, [])

    return (
        <nav className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold">
                        Shelth
                    </Link>
                    <div className="flex space-x-4">
                        {isLoggedIn && (
                            <Link href="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                        )}
                        {isLoggedIn ? (
                            <Button variant="ghost" onClick={() => {
                                localStorage.removeItem('token')
                                window.location.href = '/'
                            }}>
                                Logout
                            </Button>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
