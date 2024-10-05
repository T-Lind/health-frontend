import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" placeholder="Email" type="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" placeholder="Password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full">Log In</Button>
                    <div className="text-sm text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
