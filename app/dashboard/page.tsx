'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {InfoIcon, AlertTriangle, AlertCircle, Send, Trash2, X, PaperclipIcon} from 'lucide-react'
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
    const [attachedInfo, setAttachedInfo] = useState<Message | null>(null)
    const chatInputRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        } else {
            fetchChatHistory()
            loadMessagesFromLocalStorage()
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

    const loadMessagesFromLocalStorage = () => {
        const storedMessages = localStorage.getItem('classifiedMessages')
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages))
        }
    }

    const saveMessagesToLocalStorage = (newMessages: Message[]) => {
        localStorage.setItem('classifiedMessages', JSON.stringify(newMessages))
    }

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const message = formData.get('message') as string

        try {
            const data = await sendMessage(message)
            const newMessage = { content: message, classification: data.classification }
            const updatedMessages = [...messages, newMessage]
            setMessages(updatedMessages)
            saveMessagesToLocalStorage(updatedMessages)
            setClassification(data.classification)
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

        try {
            const data = await sendChatMessage(
                chatInput,
                attachedInfo ? attachedInfo.content : '',
                attachedInfo ? attachedInfo.classification : ''
            )
            const newAssistantMessage: ChatMessage = { role: 'assistant', content: data.response }
            setChatMessages(prev => [...prev, newAssistantMessage])
            setAttachedInfo(null)
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

    const handleAttachMessage = (message: Message) => {
        setAttachedInfo(message)
    }

    const handleCancelAttach = () => {
        setAttachedInfo(null)
    }

    const handleDeleteMessage = (index: number) => {
        const updatedMessages = messages.filter((_, i) => i !== index)
        setMessages(updatedMessages)
        saveMessagesToLocalStorage(updatedMessages)
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
            <div className="container mx-auto p-6 flex-grow flex">
                <div className="w-1/2 pr-3 space-y-6">
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
                                            <div className="mb-2">
                                                <p className="font-medium">{message.content}</p>
                                                <p className="text-sm text-gray-500">Classification: {message.classification}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <Button
                                                    onClick={() => handleAttachMessage(message)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex items-center"
                                                >
                                                    <PaperclipIcon className="h-4 w-4 mr-2" />
                                                    Attach
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteMessage(index)}
                                                    size="sm"
                                                    variant="destructive"
                                                    className="flex items-center"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No messages classified yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="w-1/2 pl-3">
                    <Card className="bg-card hover:bg-card/90 transition-colors duration-300 h-full">
                        <CardHeader>
                            <CardTitle>AI Chat</CardTitle>
                            <CardDescription>Chat with the AI about suicide prevention and risk assessment.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-8rem)] flex flex-col">
                            <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded">
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
                            {attachedInfo && (
                                <Alert variant="info" className="mb-4">
                                    <AlertTitle>Attached Information</AlertTitle>
                                    <AlertDescription>
                                        Message: {attachedInfo.content}
                                        <br />
                                        Classification: {attachedInfo.classification}
                                    </AlertDescription>
                                    <Button variant="ghost" size="sm" onClick={handleCancelAttach} className="absolute top-2 right-2">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </Alert>
                            )}
                            <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2">
                                <Textarea
                                    ref={chatInputRef}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="flex-grow"
                                />
                                <Button type="submit" size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="pb-14">
                            <Button variant="outline" onClick={handleClearChat}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Clear Chat
                            </Button>

                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
