'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {registerUser} from "@/app/api"
import {toast} from "@/hooks/use-toast"

export default function RegisterPage() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isHealthcareProvider: false,
        background: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showBackgroundModal, setShowBackgroundModal] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleCheckboxChange = (checked: boolean) => {
        setUserData({...userData, isHealthcareProvider: checked})
        if (checked) {
            setShowBackgroundModal(true)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (userData.password !== userData.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            })
            return
        }
        if (userData.isHealthcareProvider && !userData.background) {
            toast({
                title: "Error",
                description: "Please provide your background information",
                variant: "destructive",
            })
            return
        }
        setIsLoading(true)
        try {
            const data = await registerUser({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                background: userData.background
            })
            toast({
                title: "Success",
                description: "Registered successfully",
            })
            localStorage.setItem('token', data.access_token)
            router.push('/dashboard')
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Registration failed",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account to access the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={userData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isHealthcareProvider"
                                    checked={userData.isHealthcareProvider}
                                    onCheckedChange={handleCheckboxChange}
                                />
                                <Label htmlFor="isHealthcareProvider">I am a healthcare provider</Label>
                            </div>
                        </div>
                        <CardFooter className="flex flex-col space-y-4 px-0 pt-4">
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={showBackgroundModal} onOpenChange={setShowBackgroundModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Healthcare Provider Background</DialogTitle>
                        <DialogDescription>
                            Please provide detailed information about your background, life experience, and anything
                            that could be relevant to helping individuals at risk of suicide.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        id="background"
                        value={userData.background}
                        onChange={handleChange}
                        placeholder="Enter your background information here..."
                        className="min-h-[200px]"
                    />
                    <DialogFooter>
                        <Button onClick={() => setShowBackgroundModal(false)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
