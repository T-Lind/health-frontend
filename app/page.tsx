'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Brain, Search } from 'lucide-react'
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <section className="py-20 px-4 relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <motion.h1
                            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Welcome to sHealth
                        </motion.h1>
                        <motion.p
                            className="text-xl mb-8 max-w-2xl mx-auto text-blue-700"
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
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-white hover:bg-blue-50 text-blue-600 border-blue-600">
                                <Link href="/register">Register</Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-grid-blue-200/[0.2] bg-[size:20px_20px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent" />
                    </div>
                </section>

                <section className="py-16 bg-blue-50 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">How sHealth Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: CheckCircle, title: "Message Classification", content: "Our AI analyzes patient messages to identify potential suicide risks." },
                                { icon: Shield, title: "Risk Assessment", content: "Provides clear risk levels to help prioritize interventions." },
                                { icon: Brain, title: "AI Insights", content: "Get AI-powered insights to support your decision-making process." },
                                { icon: Search, title: "Search Previous Interactions", content: "View help given by professionals for a wide variety of topics." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200">
                                        <CardHeader>
                                            <item.icon className="w-12 h-12 mb-4 mx-auto text-blue-600" />
                                            <CardTitle className="text-blue-700">{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-blue-600">
                                            {item.content}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-grid-blue-200/[0.2] bg-[size:20px_20px] z-0" />
                </section>

                <section className="py-20 px-4 bg-white relative overflow-hidden">
                    <div className="container mx-auto relative z-10">
                        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose sHealth?</h2>
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
                                    <Card className="h-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300 border-blue-200">
                                        <CardHeader>
                                            <CardTitle className="text-blue-700">{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-blue-600">{item.content}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-grid-blue-200/[0.2] bg-[size:20px_20px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" />
                    </div>
                </section>

                <section className="py-20 px-4 bg-blue-600 text-white relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <motion.h2
                            className="text-3xl font-bold mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Leverage Past Successes
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Our innovative search feature allows you to explore and learn from successful previous interactions, enhancing your ability to help patients effectively.
                        </motion.p>
                        <motion.div
                            className="flex justify-center items-center space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <p className="text-lg">
                                Search through a vast database of anonymized, successful interventions to inform your approach and improve patient outcomes.
                            </p>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px] z-0" />
                </section>

                <section className="py-20 px-4 bg-blue-800 text-white relative overflow-hidden">
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
                            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50">
                                <Link href="/register">Sign Up Now</Link>
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px] z-0" />
                </section>
            </main>

            <footer className="bg-blue-900 py-6 text-white">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 sHealth. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
