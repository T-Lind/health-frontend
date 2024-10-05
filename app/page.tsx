import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Suicide Prevention System</CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              Empowering mental health professionals with AI-assisted suicide risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center">
                Our system uses advanced machine learning to classify patient messages and provide
                AI-powered insights, helping professionals identify and respond to suicide risks more effectively.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
