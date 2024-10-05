'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Brain, HeartPulse } from 'lucide-react'
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 px-4 relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <motion.h1
                            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Welcome to sHealth
                        </motion.h1>
                        <motion.p
                            className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Empowering mental health professionals with AI-assisted suicide risk assessment
                        </motion.p>
                        <motion.div
                            className="flex justify-center space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-background hover:bg-secondary">
                                <Link href="/register">Register</Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                </section>

                <section className="py-16 bg-muted relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How sHealth Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: CheckCircle, title: "Message Classification", content: "Our AI analyzes patient messages to identify potential suicide risks." },
                                { icon: Shield, title: "Risk Assessment", content: "Provides clear risk levels to help prioritize interventions." },
                                { icon: Brain, title: "AI Insights", content: "Get AI-powered insights to support your decision-making process." },
                                { icon: HeartPulse, title: "Continuous Support", content: "Ongoing monitoring and support for at-risk individuals." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
                                        <CardHeader>
                                            <item.icon className="w-12 h-12 mb-4 mx-auto text-primary" />
                                            <CardTitle>{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {item.content}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] z-0" />
                </section>

                <section className="py-20 px-4 relative overflow-hidden">
                    <div className="container mx-auto relative z-10">
                        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose sHealth?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Advanced AI Technology", content: "Our system uses state-of-the-art machine learning models to analyze patient messages and provide accurate risk assessments." },
                                { title: "User-Friendly Interface", content: "Intuitive dashboard designed for mental health professionals, making it easy to input patient messages and interpret results." },
                                { title: "Comprehensive Insights", content: "Get detailed classifications and AI-powered insights to support your clinical judgment and decision-making process." },
                                { title: "Secure and Confidential", content: "We prioritize data security and patient confidentiality, ensuring all information is protected and handled with the utmost care." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full bg-card hover:bg-card/90 transition-colors duration-300">
                                        <CardHeader>
                                            <CardTitle>{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{item.content}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
                    </div>
                </section>

                <section className="py-20 px-4 bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <motion.h2
                            className="text-3xl font-bold mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Ready to Get Started?
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Join sHealth today and enhance your ability to identify and respond to suicide risks effectively.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button asChild size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                                <Link href="/register">Sign Up Now</Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] z-0" />
                </section>
            </main>

            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>&copy; 2024 sHealth. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
