'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/app/api"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
        setError(null) // Clear error when user starts typing
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const data = await loginUser(credentials)
            toast({
                title: "Success",
                description: "Logged in successfully",
            })
            localStorage.setItem('token', data.access_token)
            router.push('/dashboard')
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed. Please check your credentials and try again.")
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Login failed",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <Card className="w-[350px] bg-white border-blue-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-800">Login</CardTitle>
                    <CardDescription className="text-blue-600">Enter your credentials to access the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                    className="border-blue-200 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    className="border-blue-200 focus:border-blue-400"
                                />
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <CardFooter className="flex flex-col space-y-4 px-0 pt-4">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-blue-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-700 hover:underline font-semibold">
                            Register here
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
