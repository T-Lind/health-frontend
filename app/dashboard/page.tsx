'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'
import {BASE_URL} from "@/app/config/config";

export default function Dashboard() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [messages, setMessages] = useState<string[]>([])
    const [classification, setClassification] = useState<string | null>(null)
    const [aiResponse, setAiResponse] = useState<string | null>(null)

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const message = formData.get('message') as string

        setMessages(prev => [...prev, message])

        const response = await fetch(BASE_URL + '/api/v1/ml-predictions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input_text: message }),
        })
        const data = await response.json()
        setClassification(data.classification)

        form.reset()
    }

    const handleAskAI = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const question = formData.get('question') as string

        const response = await fetch(BASE_URL + '/api/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: question }),
        })
        const data = await response.json()
        setAiResponse(data.response)

        form.reset()
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to the Suicide Prevention System</CardTitle>
                    <CardDescription>
                        This dashboard allows you to input patient messages, receive AI-powered classifications,
                        and get insights to assist in suicide risk assessment.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 gap-6">
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
                            <Alert>
                                <InfoIcon className="h-4 w-4" />
                                <AlertTitle>Classification Result</AlertTitle>
                                <AlertDescription>
                                    {classification === 'Supportive' && 'The message is supportive.'}
                                    {classification === 'Ideation' && 'The message indicates suicidal ideation.'}
                                    {classification === 'Indicator' && 'The message contains indicators of suicidal behavior.'}
                                    {classification === 'Behavior' && 'The message describes suicidal behavior.'}
                                    {classification === 'Attempt' && 'The message indicates a suicide attempt.'}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>AI Interaction</CardTitle>
                        <CardDescription>Ask questions about the messages and classifications to get AI-powered insights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAskAI}>
                            <Textarea name="question" placeholder="Ask a question about the messages and classification..." className="mb-4" />
                            <Button type="submit">Ask AI</Button>
                        </form>
                        {aiResponse && (
                            <Alert className="mt-4">
                                <InfoIcon className="h-4 w-4" />
                                <AlertTitle>AI Response</AlertTitle>
                                <AlertDescription>{aiResponse}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
