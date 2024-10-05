'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Brain, HeartPulse } from 'lucide-react'
import Navbar from "@/components/navbar";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">Welcome to sHealth</h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Empowering mental health professionals with AI-assisted suicide risk assessment
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button asChild size="lg">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-muted">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">How sHealth Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card>
                                <CardHeader>
                                    <CheckCircle className="w-12 h-12 mb-4 mx-auto text-primary" />
                                    <CardTitle>Message Classification</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Our AI analyzes patient messages to identify potential suicide risks.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Shield className="w-12 h-12 mb-4 mx-auto text-primary" />
                                    <CardTitle>Risk Assessment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Provides clear risk levels to help prioritize interventions.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Brain className="w-12 h-12 mb-4 mx-auto text-primary" />
                                    <CardTitle>AI Insights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Get AI-powered insights to support your decision-making process.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <HeartPulse className="w-12 h-12 mb-4 mx-auto text-primary" />
                                    <CardTitle>Continuous Support</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Ongoing monitoring and support for at-risk individuals.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Choose sHealth?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Advanced AI Technology</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Our system uses state-of-the-art machine learning models to analyze patient messages and provide accurate risk assessments.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>User-Friendly Interface</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Intuitive dashboard designed for mental health professionals, making it easy to input patient messages and interpret results.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Comprehensive Insights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Get detailed classifications and AI-powered insights to support your clinical judgment and decision-making process.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Secure and Confidential</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>We prioritize data security and patient confidentiality, ensuring all information is protected and handled with the utmost care.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-primary text-primary-foreground">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Join sHealth today and enhance your ability to identify and respond to suicide risks effectively.
                        </p>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/register">Sign Up Now</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 sHealth. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
