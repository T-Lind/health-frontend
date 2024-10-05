import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account to access the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="Full Name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" placeholder="Email" type="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" placeholder="Password" type="password" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="confirm-password" placeholder="Confirm Password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full">Register</Button>
                    <div className="text-sm text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
