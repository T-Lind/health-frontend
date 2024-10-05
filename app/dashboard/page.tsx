'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle, AlertCircle } from 'lucide-react'
import Navbar from "@/components/navbar"
import { sendMessage, askAI } from "@/app/api"

interface Message {
    content: string
    classification: string
}

export default function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [classification, setClassification] = useState<string | null>(null)
    const [aiResponse, setAiResponse] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [router])

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const message = formData.get('message') as string

        try {
            const data = await sendMessage(message)
            setClassification(data.classification)
            setMessages(prev => [...prev, { content: message, classification: data.classification }])
        } catch (error) {
            console.error('Error sending message:', error)
        }

        form.reset()
    }

    const handleAskAI = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const question = formData.get('question') as string

        try {
            const data = await askAI(question)
            setAiResponse(data.response)
        } catch (error) {
            console.error('Error asking AI:', error)
        }

        form.reset()
    }

    const getAlertVariant = (classification: string) => {
        switch (classification) {
            case 'Attempt':
            case 'Behavior':
                return 'destructive'
            case 'Ideation':
            case 'Indicator':
                return 'warning'
            case 'Supportive':
                return 'default'
            default:
                return 'default'
        }
    }

    const getAlertIcon = (classification: string) => {
        switch (classification) {
            case 'Attempt':
            case 'Behavior':
                return <AlertCircle className="h-4 w-4" />
            case 'Ideation':
            case 'Indicator':
                return <AlertTriangle className="h-4 w-4" />
            case 'Supportive':
            default:
                return <InfoIcon className="h-4 w-4" />
        }
    }

    const getAdvice = (classification: string) => {
        switch (classification) {
            case 'Attempt':
                return 'Immediate intervention is required. Contact emergency services and ensure the patient is not left alone.'
            case 'Behavior':
                return 'Monitor the patient closely and consider involving mental health professionals for further assessment.'
            case 'Ideation':
                return 'Engage in a detailed conversation with the patient to understand their thoughts and feelings. Consider a referral to a mental health specialist.'
            case 'Indicator':
                return 'Look for additional signs and symptoms. It may be beneficial to schedule a follow-up appointment soon.'
            case 'Supportive':
                return 'Provide emotional support and encourage the patient to continue with their current coping strategies.'
            default:
                return 'No specific advice available.'
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto p-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to the Suicide Prevention System</CardTitle>
                        <CardDescription>
                            This dashboard allows you to input patient messages, receive AI-powered classifications,
                            and get insights to assist in suicide risk assessment.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Message Input</CardTitle>
                            <CardDescription>Enter patient messages here for classification.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSendMessage}>
                                <Textarea name="message" placeholder="Enter message here..." className="mb-4" />
                                <Button type="submit">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Classification</CardTitle>
                            <CardDescription>AI-generated classification of the input message.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {classification && (
                                <Alert variant={getAlertVariant(classification)}>
                                    {getAlertIcon(classification)}
                                    <AlertTitle>{classification}</AlertTitle>
                                    <AlertDescription>
                                        {getAdvice(classification)}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Ask AI</CardTitle>
                        <CardDescription>Ask the AI any question related to suicide prevention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAskAI}>
                            <Textarea name="question" placeholder="Enter your question here..." className="mb-4" />
                            <Button type="submit">Ask AI</Button>
                        </form>
                        {aiResponse && (
                            <div className="mt-4 p-4 border rounded bg-gray-50">
                                <h3 className="font-bold">AI Response:</h3>
                                <p>{aiResponse}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Classification History</CardTitle>
                        <CardDescription>Review the history of classified exchanges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messages.length > 0 ? (
                            <ul className="space-y-4">
                                {messages.map((message, index) => (
                                    <li key={index} className="p-4 border rounded bg-gray-50">
                                        <p><strong>Exchange:</strong> {message.content}</p>
                                        <p><strong>Classification:</strong> {message.classification}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No messages classified yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
