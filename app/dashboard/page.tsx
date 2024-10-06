'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {InfoIcon, AlertTriangle, AlertCircle, Send, Trash2, X, PaperclipIcon, Search} from 'lucide-react'
import Navbar from "@/components/navbar"
import { sendMessage, sendChatMessage, getChatHistory, clearChatHistory, searchInteractions } from "@/app/api"
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

interface SearchResult {
    similarity: number
    content: string
    context: string
}

export default function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [classification, setClassification] = useState<string | null>(null)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [chatInput, setChatInput] = useState('')
    const [currentMessage, setCurrentMessage] = useState('')
    const [attachedInfo, setAttachedInfo] = useState<Message | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [numResults, setNumResults] = useState(2)
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

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!searchQuery.trim()) return

        try {
            const results = await searchInteractions(searchQuery, numResults)
            setSearchResults(results)
        } catch (error) {
            console.error('Error searching interactions:', error)
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
            <Navbar />
            <div className="text-center mb-8 mt-6">
                <h1 className="text-4xl font-bold mb-2 text-blue-800">Suicide Care Dashboard</h1>
                <p className="text-xl text-blue-600">Your all-in-one panel for helping patients with suicidal thoughts</p>
            </div>
            <div className="container mx-auto p-6 flex-grow flex">
                <div className="w-1/2 pr-3 space-y-6">
                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Message Input</CardTitle>
                            <CardDescription className="text-blue-600">Enter patient messages here for classification.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSendMessage}>
                                <Textarea name="message" placeholder="Enter message here..." className="mb-4 border-blue-200 focus:border-blue-400"/>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Classification</CardTitle>
                            <CardDescription className="text-blue-600">AI-generated classification of the input message.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {classification && (
                                <Alert variant={getAlertVariant(classification)} className="border-blue-300">
                                    {getAlertIcon(classification)}
                                    <AlertTitle className="text-blue-800">{classification}</AlertTitle>
                                    <AlertDescription className="text-blue-700">
                                        {getAdvice(classification)}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Classification History</CardTitle>
                            <CardDescription className="text-blue-600">Review the history of classified exchanges.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {messages.length > 0 ? (
                                <ul className="space-y-4">
                                    {messages.map((message, index) => (
                                        <li key={index} className="p-4 border rounded bg-blue-50 border-blue-200">
                                            <div className="mb-2">
                                                <p className="font-medium text-blue-800">{message.content}</p>
                                                <p className="text-sm text-blue-600">Classification: {message.classification}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <Button
                                                    onClick={() => handleAttachMessage(message)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex items-center border-blue-400 text-blue-600 hover:bg-blue-100"
                                                >
                                                    <PaperclipIcon className="h-4 w-4 mr-2"/>
                                                    Attach
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteMessage(index)}
                                                    size="sm"
                                                    variant="destructive"
                                                    className="flex items-center bg-red-500 hover:bg-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2"/>
                                                    Delete
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-blue-600">No messages classified yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Search Medical Interactions</CardTitle>
                            <CardDescription className="text-blue-600">Search through medical interactions database.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Enter search query..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-blue-200 focus:border-blue-400"
                                />
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        placeholder="Number of results"
                                        value={numResults}
                                        onChange={(e) => setNumResults(Number(e.target.value))}
                                        min={1}
                                        max={10}
                                        className="w-40 border-blue-200 focus:border-blue-400"
                                    />
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Search className="h-4 w-4 mr-2"/>
                                        Search
                                    </Button>
                                </div>
                            </form>
                            {searchResults.length > 0 && (
                                <div className="mt-4 space-y-4">
                                    <h3 className="font-semibold text-blue-800">Search Results:</h3>
                                    {searchResults.map((result, index) => (
                                        <div key={index} className="p-4 border rounded bg-blue-50 border-blue-200">
                                            <p className="font-medium text-sm text-blue-700 mb-2">Context: {result.context}</p>
                                            <p className="font-medium text-blue-800">{result.content}</p>
                                            <p className="text-sm text-blue-600 mt-2">
                                                Similarity: {(result.similarity * 100).toFixed(2)}%
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="w-1/2 pl-3">
                    <Card className="bg-white hover:bg-blue-50 transition-colors duration-300 border-blue-200 h-full">
                        <CardHeader>
                            <CardTitle className="text-blue-700">AI Chat</CardTitle>
                            <CardDescription className="text-blue-600">Chat with the AI about suicide prevention and risk assessment.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-8rem)] flex flex-col">
                            <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded border-blue-200">
                                {chatMessages.map((msg, index) => (
                                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.role === 'user' ? (
                                            <span className="inline-block p-2 rounded bg-blue-600 text-white">
                                                {msg.content}
                                            </span>
                                        ) : (
                                            <span className="inline-block p-2 rounded bg-blue-100 text-blue-800">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {attachedInfo && (
                                <Alert variant="info" className="mb-4 bg-blue-50 border-blue-300">
                                    <AlertTitle className="text-blue-800">Attached Information</AlertTitle>
                                    <AlertDescription className="text-blue-700">
                                        Message: {attachedInfo.content}
                                        <br/>
                                        Classification: {attachedInfo.classification}
                                    </AlertDescription>
                                    <Button variant="ghost" size="sm" onClick={handleCancelAttach} className="absolute top-2 right-2 text-blue-600 hover:text-blue-800">
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </Alert>
                            )}
                            <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2">
                                <Textarea
                                    ref={chatInputRef}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="flex-grow border-blue-200 focus:border-blue-400"
                                />
                                <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Send className="h-4 w-4"/>
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="pb-14">
                            <Button variant="outline" onClick={handleClearChat} className="border-blue-400 text-blue-600 hover:bg-blue-100">
                                <Trash2 className="h-4 w-4 mr-2"/>
                                Clear Chat
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
