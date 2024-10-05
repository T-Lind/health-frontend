'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle, AlertCircle, Send, Trash2, PlusCircle } from 'lucide-react'
import Navbar from "@/components/navbar"
import { sendMessage, sendChatMessage, getChatHistory, clearChatHistory } from "@/app/api"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'

interface Message {
    content: string
    classification: string
}

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export default function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [classification, setClassification] = useState<string | null>(null)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [chatInput, setChatInput] = useState('')
    const [currentMessage, setCurrentMessage] = useState('')
    const [attachInfo, setAttachInfo] = useState(false)
    const chatInputRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        } else {
            fetchChatHistory()
        }
    }, [router])

    useEffect(() => {
        if (chatInputRef.current) {
            chatInputRef.current.style.height = 'auto'
            chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`
        }
    }, [chatInput])

    const fetchChatHistory = async () => {
        try {
            const history = await getChatHistory()
            setChatMessages(history)
        } catch (error) {
            console.error('Error fetching chat history:', error)
        }
    }

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const message = formData.get('message') as string

        try {
            const data = await sendMessage(message)
            setClassification(data.classification)
            setMessages(prev => [...prev, { content: message, classification: data.classification }])
            setCurrentMessage(message)
        } catch (error) {
            console.error('Error sending message:', error)
        }

        form.reset()
    }

    const handleSendChatMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!chatInput.trim()) return

        const newUserMessage: ChatMessage = { role: 'user', content: chatInput }
        setChatMessages(prev => [...prev, newUserMessage])

        const exchange = messages.map(m => `${m.content} (${m.classification})`).join('\n')

        try {
            const data = await sendChatMessage(
                chatInput,
                attachInfo ? exchange : '',
                attachInfo ? classification || '' : ''
            )
            const newAssistantMessage: ChatMessage = { role: 'assistant', content: data.response }
            setChatMessages(prev => [...prev, newAssistantMessage])
            setAttachInfo(false)
        } catch (error) {
            console.error('Error sending chat message:', error)
        }

        setChatInput('')
    }

    const handleClearChat = async () => {
        try {
            await clearChatHistory()
            setChatMessages([])
        } catch (error) {
            console.error('Error clearing chat history:', error)
        }
    }

    const handleInsertLastClassification = async () => {
        if (classification && currentMessage) {
            setAttachInfo(true)
            alert('The exchange and classification have been attached to your next request.')
        } else if (currentMessage) {
            try {
                const data = await sendMessage(currentMessage)
                setClassification(data.classification)
                setMessages(prev => [...prev, { content: currentMessage, classification: data.classification }])
                setAttachInfo(true)
                alert('The exchange and classification have been attached to your next request.')
            } catch (error) {
                console.error('Error getting classification:', error)
            }
        }
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
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
            <Navbar />
            <div className="container mx-auto p-6 space-y-6 flex-grow">
                <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle>Welcome to the Suicide Prevention System</CardTitle>
                        <CardDescription>
                            This dashboard allows you to input patient messages, receive AI-powered classifications,
                            and get insights to assist in suicide risk assessment.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
                        <CardHeader>
                            <CardTitle>Message Input</CardTitle>
                            <CardDescription>Enter patient messages here for classification.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSendMessage}>
                                <Textarea name="message" placeholder="Enter message here..." className="mb-4" />
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
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

                <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle>AI Chat</CardTitle>
                        <CardDescription>Chat with the AI about suicide prevention and risk assessment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] overflow-y-auto mb-4 p-4 border rounded">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.role === 'user' ? (
                                        <span className="inline-block p-2 rounded bg-primary text-primary-foreground">
                                            {msg.content}
                                        </span>
                                    ) : (
                                        <span className="inline-block p-2 rounded bg-secondary text-secondary-foreground markdown">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2">
                            <Textarea
                                ref={chatInputRef}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Type your message here..."
                                className="flex-grow"
                            />
                            <Button type="button" size="icon" onClick={handleInsertLastClassification}>
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                            <Button type="submit" size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={handleClearChat}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear Chat
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="bg-card hover:bg-card/90 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle>Classification History</CardTitle>
                        <CardDescription>Review the history of classified exchanges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messages.length > 0 ? (
                            <ul className="space-y-4">
                                {messages.map((message, index) => (
                                    <li key={index} className="p-4 border rounded bg-gray-50">
                                        {message.content} ({message.classification})
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
